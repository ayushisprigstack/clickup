"use client";
import { ArrowUpRight, Eye, User, Calendar, Folder, X, Pencil, Trash2, Plus, ChevronDown, ChevronUp, CheckCircle, Clock3, Circle } from "lucide-react";
import {
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";



type Task = {
  id: number;
  title: string;
  status: string;
  priority: string;
  progress: number;
  assignedTo: string;
  startDate: string;
  endDate: string;
};

type Project = {
  id: number;
  name: string;
  tasks?: Task[];
};

export default function ProjectsPage() {

  const router = useRouter();

  const [projects, setProjects] =
    useState<Project[]>([]);

  const [name, setName] =
    useState("");

  const [searchString, setSearchString] =
    useState("");

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [openProjectId, setOpenProjectId] =
    useState<number | null>(null);

  const [taskTitle, setTaskTitle] =
    useState("");

  // Modal state for viewing project tasks
  const [showModal, setShowModal] = useState(false);
  const [modalTasks, setModalTasks] = useState<Task[]>([]);
  const [modalProjectName, setModalProjectName] = useState("");

  // FETCH PROJECTS

  async function fetchProjects() {

    const response = await fetch(
      "http://localhost:5000/projects"
    );

    const data = await response.json();

    setProjects(data);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  // CREATE PROJECT

  async function createProject() {

    if (!name) return;

    await fetch(
      "http://localhost:5000/projects",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          name,
        }),
      }
    );

    setName("");

    fetchProjects();
  }

  // UPDATE PROJECT

  async function updateProject(
    id: number
  ) {

    await fetch(
      `http://localhost:5000/projects/${id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          name,
        }),
      }
    );

    setEditingId(null);

    setName("");

    fetchProjects();
  }

  // DELETE PROJECT

  async function deleteProject(
    id: number
  ) {

    await fetch(
      `http://localhost:5000/projects/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchProjects();
  }

  // SEARCH PROJECT

  async function searchProject(
    name: string,
    sort: string
  ) {

    const response = await fetch(
      `http://localhost:5000/projects/search?name=${name}&sort=${sort}`
    );

    const data = await response.json();

    setProjects(data);
  }

  // ADD TASK

  async function addTask(
    projectId: number,
    title: string,
    status: string,
  ) {

    await fetch(
      "http://localhost:5000/tasks",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          projectId,
          title,
          status,
        }),
      }
    );

    setTaskTitle("");

    fetchProjects();
  }

  // Fetch tasks for a specific project and display in modal
  async function viewDetails(project: Project) {
    try {
      const response = await fetch(
        `http://localhost:5000/tasks?projectId=${project.id}`
      );
      const data: Task[] = await response.json();
      setModalProjectName(project.name);
      setModalTasks(data);
      setShowModal(true);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  }

  return (
    <div className="container-fluid py-4">

      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-5">

        <div>

          <h1 className="fw-bold text-dark mb-1">
            Projects
          </h1>

          <p className="text-muted mb-0">
            Manage workspace projects
          </p>

        </div>

        <div className="d-flex gap-3 align-items-center">

          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search project..."
            className="form-control rounded-4 shadow-sm border-0"
            style={{
              width: "280px",
              height: "50px",
            }}
            value={searchString}
            onChange={(e) => {

              setSearchString(
                e.target.value
              );

              searchProject(
                e.target.value,
                "latest"
              );
            }}
          />

          {/* FILTER */}

          <select
            className="form-select rounded-4 border-0 shadow-sm"
            style={{
              width: "150px",
              height: "50px",
            }}
            onChange={(e) => {
              searchProject(
                searchString,
                e.target.value
              );
            }}
          >

            <option value="">
              Filter
            </option>

            <option value="latest">
              Latest
            </option>

            <option value="oldest">
              Oldest
            </option>

            <option value="a-z">
              A-Z
            </option>

            <option value="z-a">
              Z-A
            </option>

          </select>

        </div>

      </div>

      {/* CREATE FORM */}

      <div className="card border-0 shadow-sm rounded-4 p-4 mb-5">

        <div className="d-flex gap-3">

          <input
            type="text"
            placeholder="Enter project name..."
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="form-control form-control-lg rounded-4 border-0 bg-light"
          />

          {editingId ? (

            <button
              onClick={() =>
                updateProject(
                  editingId
                )
              }
              className="btn btn-primary rounded-4 px-4"
            >
              Update
            </button>

          ) : (

            <button
              onClick={createProject}
              className="btn btn-dark rounded-4 px-4 d-flex align-items-center gap-2"
            >
              <Plus size={18} />

              Create
            </button>

          )}

        </div>

      </div>

      {/* NO PROJECT */}

      {projects.length === 0 ? (

        <div className="card border-0 shadow-sm rounded-4 p-5 text-center">

          <Folder size={60} className="mx-auto text-muted mb-3" />

          <h3 className="fw-bold">No Projects Found</h3>

          <p className="text-muted">
            Create your first project
          </p>

        </div>

      ) : (

        <div className="card border-0 shadow-sm rounded-4 p-4">

          <table className="table align-middle">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Total Tasks</th>
                <th>Progress</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <Folder
                        size={18}
                        className="text-primary"
                      />

                      <div>
                        <div className="fw-semibold">
                          {project.name}
                        </div>

                        <small className="text-muted">
                          Active Workspace
                        </small>
                      </div>
                    </div>
                  </td>

                  <td>
                    {project.tasks?.length || 0}
                  </td>

                  <td>
                    <div
                      className="progress"
                      style={{ height: "8px" }}
                    >
                      <div
                        className="progress-bar"
                        style={{ width: "78%" }}
                      />
                    </div>

                    <small>68%</small>
                  </td>

                  <td>
                    09 Jun 2026
                  </td>

                  <td>
                    <div className="d-flex gap-2">

                      <button
                        className="btn btn-light btn-sm"
                        onClick={() => {
                          setEditingId(project.id);
                          setName(project.name);
                        }}
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        className="btn btn-light btn-sm"
                        onClick={() =>
                          deleteProject(project.id)
                        }
                      >
                        <Trash2
                          size={16}
                          className="text-danger"
                        />
                      </button>

                      <button
                        className="btn  btn-sm"
                        onClick={() => viewDetails(project)}
                        title="View Tasks"
                      >
                        <Eye size={16} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for project tasks */}
          {showModal && (
            <>
              {/* Backdrop */}
              <div
                className="position-fixed top-0 start-0 w-100 h-100"
                style={{
                  background: "rgba(0,0,0,0.45)",
                  zIndex: 1040,
                }}
                onClick={() => setShowModal(false)}
              />

              <div
                className="modal d-block"
                tabIndex={-1}
                style={{ zIndex: 1050 }}
              >
                <div className="modal-dialog modal-xl modal-dialog-centered">
                  <div
                    className="modal-content border-0 shadow-lg rounded-4 overflow-hidden"
                  >
                    {/* Header */}
                    <div
                      className="p-3 text-white"
                      style={{
                        background:
                          "linear-gradient(135deg,#6366f1,#8b5cf6)",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center">

                        <div>
                          <h3 className="fw-bold mb-1"><Folder size={20} className="me-2" /> {modalProjectName}
                          </h3>

                          <small className="opacity-75">
                            {modalTasks.length} Tasks • Active Workspace
                          </small>
                        </div>

                        <button
                          className="btn"
                          onClick={() => setShowModal(false)}
                        >
                          <X size={20} className="text-white" />
                        </button>

                      </div>
                    </div>

                    {/* Body */}
                    <div
                      className="p-4"
                      style={{
                        maxHeight: "70vh",
                        overflowY: "auto",
                      }}
                    >
                      {modalTasks.length > 0 ? (
                        <div className="d-flex flex-column gap-3">

                          {modalTasks.map((task) => (

                            <div
                              key={task.id}
                              className="border rounded-4 p-3 bg-white shadow-sm"
                              style={{
                                transition: "0.2s",
                                cursor: "pointer",
                              }}
                            >

                              <div className="d-flex justify-content-between align-items-start">

                                <div>

                                  <h5 className="fw-bold mb-3">
                                    {task.title}
                                  </h5>

                                  <div className="d-flex flex-wrap gap-2">

                                    <span
                                      className="badge bg-primary"
                                      data-bs-toggle="tooltip"
                                      title={`Status: ${task.status}`}
                                    >
                                      {task.status}
                                    </span>

                                    <span
                                      className="badge bg-warning text-dark"
                                      data-bs-toggle="tooltip"
                                      title={`Priority: ${task.priority}`}
                                    >
                                      {task.priority}
                                    </span>

                                    <span
                                      className="badge bg-light text-dark border d-flex align-items-center gap-1"
                                      data-bs-toggle="tooltip"
                                      title={`Assigned to: ${task.assignedTo}`}
                                    >
                                      <User size={14} /> {task.assignedTo}
                                    </span>

                                    <span
                                      className="badge bg-light text-dark border d-flex align-items-center gap-1"
                                      data-bs-toggle="tooltip"
                                      title={`Start date: ${task.startDate}`}
                                    >
                                      <Calendar size={14} /> {task.startDate}
                                    </span>

                                  </div>

                                </div>

                                <button
                                  className="btn btn-light border px-3 py-2"
                                  onClick={() => router.push(`/tasks/${task.id}`)}
                                  title="Open task details"
                                >
                                  <ArrowUpRight size={16} />
                                </button>

                              </div>

                            </div>

                          ))}

                        </div>
                      ) : (
                        <div className="text-center py-5">
                          <h5>No Tasks Found</h5>
                          <p className="text-muted">
                            This project doesn't have any tasks yet.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>

      )}

    </div>
  );
}