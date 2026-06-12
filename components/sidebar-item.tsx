"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

type SidebarItemProps = {
  title: string;
  href: string;
  icon: React.ElementType;
};

export default function SidebarItem({
  title,
  href,
  icon: Icon,
}: SidebarItemProps) {
  const pathname = usePathname();

  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`
        d-flex align-items-center gap-3 px-3 py-2-5 rounded-3 text-decoration-none sidebar-item
        ${
          active
            ? "active-sidebar-item"
            : "hover-sidebar-item"
        }
      `}
    >
      <Icon size={18} />

      <span className="fw-medium">
        {title}
      </span>
    </Link>
  );
}