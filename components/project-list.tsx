import { projects } from "@/lib/projects";

export default function ProjectList() {
  return (
    <div className="d-flex flex-column gap-3">
      {projects.map((project) => (
        <div
          key={project.id}
          className="d-flex align-items-center justify-content-between p-3 rounded-3 border border-light-gray list-hover-item transition-all"
        >
          <div>
            <h4 className="h6 fw-semibold text-dark mb-1">
              {project.name}
            </h4>

            <p className="small text-muted mb-0">
              {project.tasks} tasks
            </p>
          </div>

          <button className="btn btn-link btn-sm text-primary text-decoration-none fw-medium">
            View
          </button>
        </div>
      ))}
    </div>
  );
}