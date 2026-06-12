"use client";

import { useState } from "react";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 w-100" style={{ maxWidth: "420px" }}>
        <div className="text-center mb-4">
          <h1 className="h3 fw-bold text-dark mb-1">
            Login
          </h1>

          <p className="text-muted small">
            Welcome back
          </p>
        </div>

        <div className="d-flex flex-column gap-3">
          <div className="form-group">
            <label className="form-label small fw-semibold text-dark mb-2">Email Address</label>
            <Input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label small fw-semibold text-dark mb-2">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <Button type="submit" className="mt-2 w-100">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}