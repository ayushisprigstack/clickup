"use client";

import SidebarItem from "./sidebar-item";
import { navigation } from "@/lib/navigation";

export default function Sidebar() {
  return (
    <aside className="sidebar-custom text-white">
      
      {/* LOGO */}

      <div className="sidebar-logo d-flex align-items-center px-4">
        <div>
          <h1 className="h3 fw-bold mb-0">
            ClickUp
          </h1>

          <p className="small text-light-muted mb-0">
            Workspace
          </p>
        </div>
      </div>

      {/* MENU */}

      <div className="flex-grow-1 p-3 sidebar-menu d-flex flex-column gap-1">
        {navigation.map((item) => (
          <SidebarItem
            key={item.href}
            title={item.title}
            href={item.href}
            icon={item.icon}
          />
        ))}
      </div>

      {/* BOTTOM */}

      <div className="p-3 border-top border-white-10">
        <div className="bg-cyan-custom rounded-4 p-3 text-white">
          <p className="small mb-0 fw-semibold">
            Pro Workspace
          </p>

          <button className="btn btn-light btn-sm w-100 rounded-3 mt-3 py-2 fw-medium border-0">
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
}