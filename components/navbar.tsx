"use client";

import {
  Bell,
  Search,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="navbar-custom d-flex align-items-center justify-content-between px-4 border-bottom bg-white">
      
      {/* TITLE */}

      <h2 className="h4 fw-bold text-dark mb-0">
        ClickUp Workspace
      </h2>

      {/* RIGHT */}

      <div className="d-flex align-items-center gap-3">

        {/* SEARCH */}

        <div className="position-relative d-none d-sm-block">
          <Search
            size={16}
            className="position-absolute start-0 top-50 translate-middle-y ms-3 text-muted"
          />

          <input
            type="text"
            placeholder="Search..."
            className="form-control rounded-pill ps-5 pe-3 py-2 bg-light border-0 search-input"
            style={{ width: "240px" }}
          />
        </div>

        {/* BELL */}

        <button className="btn btn-light rounded-3 icon-btn d-flex align-items-center justify-content-center border-0">
          <Bell size={18} />
        </button>

        {/* USER */}

        <div className="user-avatar rounded-circle bg-dark text-white d-flex align-items-center justify-content-center fw-bold">
          A
        </div>
      </div>
    </header>
  );
}