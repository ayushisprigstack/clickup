import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import SectionCard from "@/components/ui/section-card";
import ProjectList from "@/components/project-list";
import ActivityFeed from "@/components/activity-feed";

export default function HomePage() {
  return (
    <div className="d-flex flex-column gap-4">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h1 className="h2 fw-bold text-dark mb-1">
            Dashboard
          </h1>

          <p className="text-muted mb-0">
            Welcome back
          </p>
        </div>

        <Button>Create Project</Button>
      </div>

      <div className="row g-4">
        <div className="col-12 col-md-6 col-lg-4">
          <Card
            title="Total Projects"
            value="12"
          />
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <Card
            title="Active Tasks"
            value="48"
          />
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <Card
            title="Team Members"
            value="8"
          />
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <SectionCard title="Recent Projects">
            <ProjectList />
          </SectionCard>
        </div>

        <div className="col-12 col-lg-6">
          <SectionCard title="Activity Feed">
            <ActivityFeed />
          </SectionCard>
        </div>
      </div>
    </div>
  );
}