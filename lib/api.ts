// lib/api.ts
export async function updateTask(taskId: string | number, data: any) {
  // Retrieve the current task to preserve untouched fields
  const currentRes = await fetch(`http://localhost:5000/tasks/${taskId}`);
  const currentTask = await currentRes.json();

  // Merge existing task data with the new partial data
  const merged = { ...currentTask, ...data };

  // Clean up description if present
  if (merged.description && typeof merged.description === "string") {
    merged.description = merged.description.trim();
  }

  await fetch(`http://localhost:5000/tasks/${taskId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(merged),
  });
}



