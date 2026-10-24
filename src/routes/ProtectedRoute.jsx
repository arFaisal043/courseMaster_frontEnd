import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken } from "../utils/auth";

export default function ProtectedRoute({ children }) {
  const { token, user, loading, isAuthenticated, sessionChecked, error } = useSelector((state) => state.auth);

  if (!token || !getToken()) {
    return <Navigate to="/login" replace />;
  }

  if (loading || !sessionChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    if (error) {
      return (
        <div role="alert" className="alert alert-error m-6">
          <span>Unable to verify your session. Check your connection and try again.</span>
          <button type="button" className="btn btn-sm" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      );
    }
    return <Navigate to="/login" replace />;
  }

  return children;
}
