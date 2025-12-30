import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Login() {
  const nav = useNavigate();
  const { login, loading, error } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    nav("/dashboard");
  };

  return (
    <div className="card" style={{ maxWidth: 520, margin: "0 auto" }}>
      <h1 className="h2">Login</h1>

      <form onSubmit={onSubmit}>
        <label className="label">Email</label>
        <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label className="label">Password</label>
        <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        {error && <p className="err">{error}</p>}

        <div className="btn--row" style={{ marginTop: 12 }}>
          <button className="btn" disabled={loading}>
            {loading ? "Signing in…" : "Login"}
          </button>
          <Link className="btn--ghost" to="/register">Create account</Link>
        </div>
      </form>
    </div>
  );
}
