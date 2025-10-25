"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("Login submitted (demo).");
  };

  return (
    <div className="max-w-md mx-auto card p-6 mt-6">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="label">Email</label>
          <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div>
          <label className="label">Password</label>
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <button className="btn btn-primary w-full" type="submit">Submit</button>
      </form>
      {msg && <p className="text-sm text-teal-300 mt-3">{msg}</p>}
    </div>
  );
}
