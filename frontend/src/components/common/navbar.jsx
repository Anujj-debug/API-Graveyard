import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

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
          {token ? (
            <>
              <Link to="/profile" className="font-medium">
                {user?.username}
              </Link>

              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  window.location.reload();
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
        </nav>
      </div>
    </header>
  );
}
