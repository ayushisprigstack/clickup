"use client";

import {
    ArrowLeft,
    Calendar,
    User,
    Flag,
    MessageSquare,
} from "lucide-react";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TaskDetailPage() {
    const router = useRouter();
    const { id } = useParams();

    const [task, setTask] = useState<any>(null);
    const [descLines, setDescLines] = useState([
        { text: "", done: false },
    ]);
    const updateTask = async (
        taskId: number,
        data: any
    ) => {
        try {
            const response = await fetch(
                `http://localhost:5000/tasks/${taskId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update task");
            }

            return await response.json();
        } catch (error) {
            console.error(error);
        }
    };

    const saveDescription = async (
        updatedLines: any[]
    ) => {
        const description = updatedLines
            .map((line) => line.text)
            .join("\n");

        await updateTask(task.id, {
            description,
        });
    };


    // initialize checklist when task loads
    useEffect(() => {
        if (task && typeof task.description === 'string') {
            const lines = task.description.split('\n').map((t: string) => ({ text: t, done: false }));
            setDescLines(lines);
        }
    }, [task]);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/tasks/${id}`)
                .then((res) => res.json())
                .then((data) => setTask(data))
                .catch((err) =>
                    console.error("Failed to load task", err)
                );
        }
    }, [id]);

    if (!task) {
        return (
            <div className="container-fluid p-5">
                Loading...
            </div>
        );
    }

    return (
        <div
            className="container-fluid py-4 px-5"
            style={{
                background: "#ffffff",
                minHeight: "100vh",
            }}
        >
            <div className="row">

                {/* LEFT CONTENT */}

                <div className="col-lg-8 pe-lg-5">

                    {/* Header */}

                    <div className="mb-5">

                        <div className="d-flex align-items-center gap-3 mb-3">

                            <button
                                className="btn btn-light  shadow-sm"
                                onClick={() => router.back()}
                            >
                                <ArrowLeft size={18} />
                            </button>

                            <div>

                                <h1
                                    className="mb-2 fw-semibold"
                                    style={{
                                        fontSize: "40px",
                                        lineHeight: 1.1,
                                    }}
                                >
                                    {task.title}
                                </h1>

                                <div className="d-flex gap-2">

                                    <span
                                        className="badge px-3 py-2"
                                        style={{
                                            background: "#06b6d4",
                                            fontSize: "10px",
                                        }}
                                    >
                                        {task.status}
                                    </span>

                                    <span
                                        className="badge px-3 py-2 text-dark"
                                        style={{
                                            background: "#facc15",
                                            fontSize: "10px",
                                        }}
                                    >
                                        {task.priority}
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* AI Banner */}

                    <div
                        className="rounded-4 px-4 py-3 mb-5"
                        style={{
                            background: "#f8fafc",
                            border: "1px solid #e5e7eb",
                        }}
                    >
                        ✨ Ask AI to create a summary,
                        generate subtasks or find similar tasks
                    </div>

                    {/* Properties */}

                    <div className="row mb-5">

                        <div className="col-md-6">

                            <div className="d-flex mb-4">

                                <div
                                    className="text-muted mb-2"
                                    style={{
                                        width: 140,
                                    }}
                                >
                                    Status
                                </div>

                                <span
                                    className="badge px-3 py-2 mb-2"
                                    style={{
                                        background: "#22c55e",
                                    }}
                                >
                                    {task.status}
                                </span>

                            </div>

                            <div className="d-flex mb-4">

                                <div
                                    className="text-muted mb-2"
                                    style={{
                                        width: 140,
                                    }}
                                >
                                    Start Date
                                </div>

                                <div className="mb-2">

                                    <Calendar
                                        size={16}
                                        className="me-2"
                                    />

                                    {task.startDate}

                                </div>

                            </div>

                        </div>

                        <div className="col-md-6">

                            <div className="d-flex mb-4">

                                <div
                                    className="text-muted"
                                    style={{
                                        width: 160,
                                    }}
                                >
                                    Assignee
                                </div>

                                <div className="d-flex align-items-center gap-2">

                                    <div
                                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                                        style={{
                                            width: 32,
                                            height: 32,
                                            background: "#6366f1",
                                        }}
                                    >
                                        {task.assignedTo?.charAt(0)?.toUpperCase()}
                                    </div>

                                    {task.assignedTo}

                                </div>

                            </div>

                            <div className="d-flex mb-4">

                                <div
                                    className="text-muted"
                                    style={{
                                        width: 160,
                                    }}
                                >
                                    Priority
                                </div>

                                <div>

                                    <Flag
                                        size={16}
                                        className="me-2"
                                    />

                                    {task.priority}

                                </div>

                            </div>

                        </div>

                    </div>

                    <hr className="mb-5" />

                    {/* Description */}

                    <div className="mb-5">

                        <h4 className="fw-semibold mb-4">
                            Description
                        </h4>

                        <div
                            className="rounded-4 p-4"
                            style={{
                                background: "#fafafa",
                                minHeight: "300px",
                                border: "1px solid #e5e7eb",
                            }}
                        >
                            {descLines.map((line, idx) => (
                                <div
                                    key={idx}
                                    className="d-flex align-items-center mb-2"
                                >
                                    <input
                                        type="checkbox"
                                        className="form-check-input me-2"
                                        checked={line.done}
                                        onChange={() => {
                                            const updated = [...descLines];
                                            updated[idx].done =
                                                !updated[idx].done;
                                            setDescLines(updated);
                                        }}
                                    />

                                    <input
                                        type="text"
                                        className="form-control border-0 bg-transparent"
                                        placeholder="Write task item..."
                                        value={line.text}
                                        onChange={async (e) => {
                                            const updated = [...descLines];

                                            updated[idx].text = e.target.value;

                                            setDescLines(updated);

                                            await saveDescription(updated);
                                        }}
                                        onKeyDown={async (e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();

                                                const updated = [...descLines];

                                                updated.splice(idx + 1, 0, {
                                                    text: "",
                                                    done: false,
                                                });

                                                setDescLines(updated);

                                                await saveDescription(updated);
                                            }
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* RIGHT SIDEBAR */}

                <div className="col-lg-4">

                    <div
                        style={{
                            position: "sticky",
                            top: "15px",
                            height: "calc(100vh - 40px)",
                            borderLeft:
                                "1px solid #e5e7eb",
                            paddingLeft: "24px",
                        }}
                    >

                        <div className="d-flex align-items-center mb-4">

                            <MessageSquare
                                size={20}
                                className="me-2"
                            />

                            <h4 className="mb-0">
                                Activity
                            </h4>

                        </div>

                        {/* Activity Items */}

                        <div className="mb-4">

                            <div className="fw-semibold">
                                Ayushi
                            </div>

                            <div className="text-muted">
                                Task created.
                            </div>

                        </div>

                        <div className="mb-4">

                            <div className="fw-semibold">
                                Ayushi
                            </div>

                            <div className="text-muted">
                                Status changed to In Progress.
                            </div>

                        </div>

                        <div className="mb-4">

                            <div className="fw-semibold">
                                Ayushi
                            </div>

                            <div className="text-muted">
                                Priority updated to High.
                            </div>

                        </div>

                        {/* Comment Box */}

                        <div
                            style={{
                                position: "absolute",
                                bottom: 0,
                                left: 24,
                                right: 0,
                            }}
                        >

                            <textarea
                                className="form-control mb-3"
                                rows={4}
                                placeholder="Write a comment..."
                            />

                            <button className="btn btn-primary w-100">
                                Post Comment
                            </button>

                        </div>

                    </div>

                </div>

            </div >
        </div >
    );
}