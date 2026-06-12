"use client";

import { useState } from "react";

export default function CreateProjectPage() {
  const [name, setName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function createProject() {
    if (!name) return;

    try {
      setLoading(true);

      const response = await fetch(
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

      const data =
        await response.json();

      console.log(data);

      alert("Project created!");

      setName("");
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-10 max-w-2xl">
      <h1 className="text-4xl font-bold mb-2">
        Create Project
      </h1>

      <p className="text-gray-500 mb-8">
        Add a new project to workspace
      </p>

      <div className="bg-white rounded-2xl border p-6 space-y-5">
        <div>
          <label className="block mb-2 font-medium">
            Project Name
          </label>

          <input
            type="text"
            placeholder="Enter project name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          onClick={createProject}
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          {loading
            ? "Creating..."
            : "Create Project"}
        </button>
      </div>
    </div>
  );
}