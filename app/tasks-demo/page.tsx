"use client";

import { useState } from "react";

export default function TasksDemoPage() {
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState([
    "Learn React",
    "Build ClickUp Clone",
  ]);

  function addTask() {
    if (!task) return;

    setTasks([...tasks, task]);

    setTask("");
  }

  function deleteTask(index: number) {
    const filteredTasks = tasks.filter(
      (_, i) => i !== index
    );

    setTasks(filteredTasks);
  }

  return (
    <div className="container py-5" style={{ maxWidth: "600px" }}>
      <h1 className="h3 fw-bold mb-4">
        Task Manager
      </h1>

      <div className="d-flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) =>
            setTask(e.target.value)
          }
          className="form-control rounded-3 px-3 py-2 custom-input"
        />

        <button
          onClick={addTask}
          className="btn btn-dark rounded-3 px-4 custom-btn"
        >
          Add
        </button>
      </div>

      <div className="d-flex flex-column gap-2">
        {tasks.map((item, index) => (
          <div
            key={index}
            className="d-flex align-items-center justify-content-between border rounded-3 p-3 bg-white shadow-sm"
          >
            <p className="mb-0">{item}</p>

            <button
              onClick={() =>
                deleteTask(index)
              }
              className="btn btn-link text-danger text-decoration-none p-0 fw-medium"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}