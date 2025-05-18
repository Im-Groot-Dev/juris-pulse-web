
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: "user" | "lawyer" | "admin";
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { isAuthenticated, user, loading, refreshUser } = useAuth();
  const location = useLocation();

  // Add auto-refresh to ensure auth state is current
  useEffect(() => {
    // Try to refresh the user state when component mounts
    refreshUser();
  }, [refreshUser]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    toast.error("Please log in to access this page");
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Role check if specified
  if (role && user?.role !== role) {
    toast.error(`This area is restricted to ${role}s only`);
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
