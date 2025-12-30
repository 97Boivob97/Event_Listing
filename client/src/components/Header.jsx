import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Header() {
  const { token, logout } = useAuthStore();

  return (
    <header className="header">
      <div className="header__inner">
        <Link className="logo" to="/">EventListing</Link>

        <nav className="nav">
          <NavLink to="/events">Events</NavLink>
          {token ? (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <button className="btn--ghost" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink className="btn" to="/register">Register</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
