import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { Navigate, useLocation } from "react-router";
import Loader from "../components/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <Loader />;

  if (!user) {
    // Redirect to login but save the current path to come back afterward
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;