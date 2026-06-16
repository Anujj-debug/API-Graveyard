import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./theme-toggle";
import { useAuth } from "@/context/auth-context";
import { LogOut, UserCircle2, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  
  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse APIs", path: "/apis" },
    { name: "Submit API", path: "/submit-api" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="text-lg font-bold tracking-tight text-foreground">
          API Graveyard
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="rounded-md px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground">
              {link.name}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 font-medium text-foreground transition-colors hover:bg-accent">
                <UserCircle2 className="h-4 w-4" />
                {user?.username}
              </Link>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 font-medium text-foreground transition-colors hover:border-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-md px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground">Login</Link>
              <Link to="/register" className="rounded-md bg-primary px-3 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90">Register</Link>
            </>
          )}
          <ThemeToggle />
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button 
            onClick={toggleMobileMenu}
            className="text-foreground p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background">
          <nav className="flex flex-col space-y-2 px-6 py-4 text-sm text-muted-foreground">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-md px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="my-2 border-t border-border" />
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center gap-2 rounded-md px-3 py-2 font-medium text-foreground transition-colors hover:bg-accent"
                >
                  <UserCircle2 className="h-4 w-4" />
                  {user?.username}
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-md px-3 py-2 font-medium text-foreground transition-colors hover:text-destructive hover:bg-destructive/10 text-left"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link 
                  to="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-md border border-border text-center px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-md bg-primary text-center px-3 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
