import Link from "next/link";
import { ArrowUpDown, ArrowUpRight, ChevronDown, Flag } from "lucide-react";
import { useRouter } from "next/navigation";
export default function TaskSectionCard({
    title,
    badge,
    tasks,
    setSort,
    updateTask,
}: any) {
    const router = useRouter();


    return (
        <div className="bg-white rounded-4 shadow-sm p-4 mb-4">

            <div className="d-flex align-items-center gap-2 mb-4">

                <ChevronDown size={18} />

                <span className={`badge bg-${badge}`}>
                    {title}
                </span>

                <span className="text-muted">
                    {tasks.length}
                </span>

            </div>

            {/* HEADER */}

            <div className="row fw-semibold text-muted border-bottom pb-3 mb-3">

                <div className="col-4">

                    <button
                        className="btn p-0 fw-semibold text-muted d-flex align-items-center gap-2"
                        onClick={() =>
                            setSort("name")
                        }
                    >

                        Task Name

                        <ArrowUpDown size={16} />

                    </button>

                </div>

                <div className="col-2">
                    Assignee
                </div>

                <div className="col-2">
                    Start
                </div>

                <div className="col-2">
                    Status
                </div>

                <div className="col-2">

                    <button
                        className="btn p-0 fw-semibold text-muted d-flex align-items-center gap-2"
                        onClick={() =>
                            setSort("priority")
                        }
                    >

                        Priority

                        <ArrowUpDown size={16} />

                    </button>

                </div>



            </div>

            {/* ROWS */}

            {tasks.map((task: any) => (

                <div key={task.id} className="row align-items-center py-3 border-bottom">
                    <div className="col-4 fw-medium">{task.title}</div>
                    <div className="col-2">
                        <div className="d-flex align-items-center gap-2">
                            <div
                                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center cursor-pointer"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title={`${task.assignedTo}`}
                                style={{
                                    width: "32px",
                                    height: "32px",
                                    fontSize: "12px",
                                }}
                            >
                                {task.assignedTo?.charAt(0)}
                            </div>
                        </div>
                    </div>
                    <div className="col-2">{task.startDate}</div>
                    <div className="col-2">
                        <select
                            className="form-select form-select-sm"
                            value={task.status}
                            onChange={(e) =>
                                updateTask(task.id, {
                                    status: e.target.value,
                                })
                            }
                        >
                            <option value="Todo">Todo</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div className="col-2">
                        <div className="d-flex align-items-center gap-2 cursor-pointer" data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title={`${task.priority}`}>
                            <Flag
                                size={15}
                                className={
                                    task.priority === "High"
                                        ? "text-danger"
                                        : task.priority === "Medium"
                                            ? "text-warning"
                                            : "text-secondary"
                                }
                            />
                        </div>
                    </div>
                    <div className="col-2">
                        <Link href={`/tasks/${task.id}`} className="btn btn-light border px-3 py-2" title="Open task details">
                            <ArrowUpRight size={16} />
                        </Link>
                    </div>
                </div>

            ))}

        </div>
    );
}