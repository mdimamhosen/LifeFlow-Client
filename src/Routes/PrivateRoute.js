import { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../Hooks/useAuth";
import Spiner from "../Components/Spiner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <Spiner />;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
