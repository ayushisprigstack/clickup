import { FolderKanban } from "lucide-react";

type CardProps = {
  title: string;
  value: string;
};

export default function Card({
  title,
  value,
}: CardProps) {
  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 hover-shadow-transition bg-white">
      <div className="card-body p-0">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <span className="text-muted small fw-semibold">
            {title}
          </span>

          <FolderKanban
            size={20}
            className="text-secondary opacity-50"
          />
        </div>

        <h2 className="h1 fw-bold mb-0">
          {value}
        </h2>
      </div>
    </div>
  );
}