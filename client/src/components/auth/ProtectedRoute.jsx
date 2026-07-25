import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, checkingSession } = useAuth();

  if (checkingSession) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#121110] text-zinc-500 text-sm">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
