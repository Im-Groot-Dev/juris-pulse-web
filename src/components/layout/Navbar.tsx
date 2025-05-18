
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed top-0 left-0 right-0 z-20 border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 text-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              </svg>
              <span className="text-xl font-display site-title">Legal Bharat</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link to="/services" className="text-foreground/70 hover:text-accent transition-colors px-3 py-2">
                Services
              </Link>
              <Link to="/find-lawyer" className="text-foreground/70 hover:text-accent transition-colors px-3 py-2">
                Find a Lawyer
              </Link>
              <Link to="/resources" className="text-foreground/70 hover:text-accent transition-colors px-3 py-2">
                Resources
              </Link>
              <Link to="/pricing" className="text-foreground/70 hover:text-accent transition-colors px-3 py-2">
                Pricing
              </Link>
              <Link to="/about" className="text-foreground/70 hover:text-accent transition-colors px-3 py-2">
                About
              </Link>

              {isAuthenticated ? (
                <>
                  <Link 
                    to={user?.role === 'lawyer' ? "/lawyer-dashboard" : "/user-dashboard"} 
                    className="text-foreground/70 hover:text-accent transition-colors px-3 py-2"
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={logout} 
                    className="bg-accent hover:bg-accent/90 text-accent-foreground px-3 py-1 rounded-md transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-foreground/70 hover:text-accent transition-colors px-3 py-2">
                    Login
                  </Link>
                  <Link to="/register" className="bg-accent hover:bg-accent/90 text-accent-foreground px-3 py-1 rounded-md transition-colors">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            {/* Mobile menu button */}
            <button className="text-foreground/70 hover:text-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
