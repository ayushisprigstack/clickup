"use client";

import { useEffect, useState } from "react";

type Project = {
  id: number;
  name: string;
};

export default function BackendDemoPage() {
  const [projects, setProjects] =
    useState<Project[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const response = await fetch(
        "http://localhost:5000/projects"
      );

      const data = await response.json();

      setProjects(data);

      setLoading(false);
    }

    fetchProjects();
  }, []); // useEffect runs only once when the component mounts

  if (loading) {
    return (
      <div className="p-5 d-flex align-items-center gap-3">
        <div className="spinner-border text-primary spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="text-muted fw-medium">Loading projects...</span>
      </div>
    );
  }

  return (
    <div className="p-5 d-flex flex-column gap-3">
      <h1 className="h3 fw-bold mb-4">
        Backend Projects
      </h1>

      <div className="d-flex flex-column gap-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className="d-flex align-items-center p-3 rounded-3 border border-light-gray list-hover-item transition-all"
          >
            <h4 className="h6 fw-semibold text-dark mb-0">
              {project.name}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
}