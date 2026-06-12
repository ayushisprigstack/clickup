import { activity } from "@/lib/activity";

export default function ActivityFeed() {
  return (
    <div className="d-flex flex-column gap-3">
      {activity.map((item, index) => (
        <div
          key={index}
          className="p-3 rounded-3 border border-light-gray small text-secondary list-hover-item transition-all"
        >
          {item}
        </div>
      ))}
    </div>
  );
}