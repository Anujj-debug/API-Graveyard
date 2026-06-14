import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./theme-toggle";
import { useAuth } from "@/context/auth-context";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="text-lg font-bold">
          API Graveyard
        </Link>

        <nav className="flex items-center gap-6">
          <Link to="/">Home</Link>
          <Link to="/apis">Browse APIs</Link>
          <Link to="/submit-api">Submit API</Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="font-medium">
                {user?.username}
              </Link>

              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
