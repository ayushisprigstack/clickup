
"use client";
//Tells Next 13 that this file must run in the browser
import { useEffect, useState } from "react";

import {
  Search,
  Plus,
  ChevronDown,
  Flag,
  ArrowUpDown,
} from "lucide-react";
import TaskSectionCard from "../../../components/task-section-card";

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignedTo: string;
  startDate: string;
  endDate: string;
};

type Project = {
  id: number;
  name: string;
};

//Declares TypeScript shapes for a task and a project – just a way to tell the editor what fields each object has (id, title, status, …).
export default function TasksPage() {
  //The main component that renders the whole page. Inside it


  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [projects, setProjects] =
    useState<Project[]>([]);

  const [showModal, setShowModal] =
    useState(false);

  const [projectId, setProjectId] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [priority, setPriority] =
    useState("Medium");

  const [status, setStatus] =
    useState("Todo");

  const [assignedTo, setAssignedTo] =
    useState("");

  const [progress, setProgress] =
    useState(0);

  const [searchString, setSearchString] =
    useState("");

  // SEPARATE SORT STATES

  const [todoSort, setTodoSort] =
    useState("id");

  const [progressSort, setProgressSort] =
    useState("id");

  const [completedSort, setCompletedSort] =
    useState("id");

  // FETCH TASKS

  async function fetchTasks() {

    const response = await fetch(
      "http://localhost:5000/tasks"
    );

    const data = await response.json();

    setTasks(data);
  }

  // FETCH PROJECTS

  async function fetchProjects() {

    const response = await fetch(
      "http://localhost:5000/projects"
    );

    const data = await response.json();

    setProjects(data);
  }

  useEffect(() => {

    fetchTasks();

    fetchProjects();

  }, []);

  // ADD TASK

  async function addTask(
    title: string,
    description: string,
    startDate: string,
    endDate: string,
    priority: string,
    status: string,
    assignedTo: string,
    progress: number,
    projectId: number,
  ) {

    await fetch(
      "http://localhost:5000/tasks",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          projectId,
          title,
          description,
          startDate,
          endDate,
          priority,
          status,
          assignedTo,
          progress,
        }),
      }
    );
  }

  // SEARCH TASK

  async function searchTask(
    name = ""
  ) {

    const response = await fetch(
      `http://localhost:5000/tasks/search?name=${name}`
    );

    const data = await response.json();

    setTasks(data);
  }


  async function updateTask(
    taskId: number,
    data: any
  ) {
    await fetch(
      `http://localhost:5000/tasks/${taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(
          data,
        ),
      }
    );

    fetchTasks();
  }



  // CLEAR FORM

  function clearForm() {

    setTitle("");

    setDescription("");

    setStartDate("");

    setEndDate("");

    setPriority("Medium");

    setStatus("Todo");

    setAssignedTo("");

    setProgress(0);

    setProjectId("");
  }

  // Helper that resets all the “new task” form fields back to their defaults.

  // FILTER TASKS

  const todoTasks = tasks.filter(
    (task) => task.status === "Todo"
  );

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  );

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  );

  // SORT TASKS

  function sortTasks(
    taskList: Task[],
    sortType: string
  ) {

    const sortedTasks = [...taskList];

    if (sortType === "name") {

      sortedTasks.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    else if (sortType === "priority") {

      const priorityOrder = {
        High: 1,
        Medium: 2,
        Low: 3,
      };

      sortedTasks.sort(
        (a, b) =>
          priorityOrder[
          a.priority as keyof typeof priorityOrder
          ] -
          priorityOrder[
          b.priority as keyof typeof priorityOrder
          ]
      );
    }

    return sortedTasks;
  }

  return (
    <div className="container-fluid">

      {/* MODAL */}

      {showModal && (

        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            background: "rgba(0,0,0,0.5)",
            zIndex: 9999,
          }}
        >

          <div
            className="bg-white rounded-4 p-4"
            style={{
              width: "700px",
            }}
          >

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center mb-4">

              <h3 className="fw-bold mb-0">
                Create Task
              </h3>

              <button
                className="btn-close"
                onClick={() => {

                  clearForm();

                  setShowModal(false);
                }}
              ></button>

            </div>

            {/* FORM */}

            <div className="row g-3">

              <div className="col-12">

                <label className="form-label">
                  Task Title
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                />

              </div>

              <div className="col-12">

                <label className="form-label">
                  Description
                </label>

                <textarea
                  className="form-control"
                  rows={4}
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                />

              </div>

              <div className="col-md-6">

                <label className="form-label">
                  Start Date
                </label>

                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) =>
                    setStartDate(e.target.value)
                  }
                />

              </div>

              <div className="col-md-6">

                <label className="form-label">
                  End Date
                </label>

                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={(e) =>
                    setEndDate(e.target.value)
                  }
                />

              </div>

              <div className="col-md-6">

                <label className="form-label">
                  Priority
                </label>

                <select
                  className="form-select"
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value)
                  }
                >

                  <option value="Low">
                    Low
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="High">
                    High
                  </option>

                </select>

              </div>

              <div className="col-md-6">

                <label className="form-label">
                  Status
                </label>

                <select
                  className="form-select"
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                >

                  <option value="Todo">
                    Todo
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                </select>

              </div>

              <div className="col-md-6">

                <label className="form-label">
                  Assigned User
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={assignedTo}
                  onChange={(e) =>
                    setAssignedTo(e.target.value)
                  }
                />

              </div>

              <div className="col-md-6">

                <label className="form-label">
                  Project
                </label>

                <select
                  className="form-select"
                  value={projectId}
                  onChange={(e) =>
                    setProjectId(e.target.value)
                  }
                >

                  <option value="">
                    Select Project
                  </option>

                  {projects.map((project) => (

                    <option
                      key={project.id}
                      value={project.id}
                    >
                      {project.name}
                    </option>

                  ))}

                </select>

              </div>

            </div>

            {/* FOOTER */}

            <div className="d-flex justify-content-end gap-3 mt-4">

              <button
                className="btn btn-light"
                onClick={() => {

                  clearForm();

                  setShowModal(false);
                }}
              >
                Cancel
              </button>

              <button
                className="btn btn-primary"
                onClick={async () => {

                  await addTask(
                    title,
                    description,
                    startDate,
                    endDate,
                    priority,
                    status,
                    assignedTo,
                    progress,
                    Number(projectId),
                  );

                  await fetchTasks();

                  clearForm();

                  setShowModal(false);
                }}
              >
                Save Task
              </button>

            </div>

          </div>
        </div>
      )}

      {/* TOP BAR */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h1 className="fw-bold mb-1">
            Tasks
          </h1>

          <p className="text-muted">
            Manage workspace tasks
          </p>

        </div>

        <div className="d-flex gap-3">

          {/* SEARCH */}

          <div className="position-relative">

            <Search
              size={18}
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
            />

            <input
              type="text"
              placeholder="Search task..."
              className="form-control rounded-4 ps-5"
              style={{
                width: "280px",
                height: "48px",
              }}
              value={searchString}
              onChange={(e) => {

                setSearchString(
                  e.target.value
                );

                searchTask(
                  e.target.value
                );
              }}
            />

          </div>

          {/* BUTTON */}

          <button
            className="btn btn-primary rounded-4 px-4 d-flex align-items-center gap-2"
            onClick={() => {

              clearForm();

              setShowModal(true);
            }}
          >

            <Plus size={18} />

            Create Task

          </button>

        </div>

      </div>

      {/* TODO */}

      <TaskSectionCard
        title="TODO"
        badge="secondary"
        tasks={sortTasks(todoTasks, todoSort)}
        setSort={setTodoSort}
        updateTask={updateTask}
      />

      {/* IN PROGRESS */}

      <TaskSectionCard
        title="IN PROGRESS"
        badge="info"
        tasks={sortTasks(inProgressTasks, progressSort)}
        setSort={setProgressSort}
        updateTask={updateTask}
      />

      {/* COMPLETED */}

      <TaskSectionCard
        title="COMPLETED"
        badge="success"
        tasks={sortTasks(completedTasks, completedSort)}
        setSort={setCompletedSort}
        updateTask={updateTask}
      />
      {/* This is the main container that holds all three task boards (Todo, In Progress, Completed) */}
    </div>
  );
}
