import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-lg font-bold"
        >
          API Graveyard
        </Link>

        <nav className="flex items-center gap-6">
          <Link to="/">Home</Link>
          <Link to="/submit-api">
            Submit API
          </Link>
          <Link to="/login">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}