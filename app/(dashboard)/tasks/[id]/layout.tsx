"use client";

import { ReactNode } from "react";

// Layout for the task detail page. It intentionally omits the sidebar
// because the page itself provides its own header and navigation.
export default function TaskDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
