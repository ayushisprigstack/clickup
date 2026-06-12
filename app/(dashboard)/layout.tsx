"use client";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideSidebar = /^\/tasks\/\d+$/.test(pathname);

  return (
    <div className="d-flex vh-100 overflow-hidden bg-light-gray">
      {/* SIDEBAR */}
      {!hideSidebar && <Sidebar />}

      {/* RIGHT SIDE */}
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        {/* NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="flex-grow-1 overflow-auto p-4 p-md-5">
          {children}
        </main>
      </div>
    </div>
  );
}
