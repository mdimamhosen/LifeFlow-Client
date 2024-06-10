import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useUserInfo from "../Hooks/useUserInfo";
import Spiner from "../Components/Spiner";

const AdminRoute = ({ children }) => {
  const { logOut } = useAuth();
  const [userInfo, refetch, isLoading] = useUserInfo();
  const location = useLocation();

  useEffect(() => {
    console.log("UserInfo:", userInfo);
    console.log("IsLoading:", isLoading);

    if (!isLoading && userInfo?.role !== "Admin") {
      logOut();
    }
  }, [isLoading, userInfo, logOut]);

  if (isLoading) {
    return <Spiner />;
  }

  if (userInfo?.role === "Admin") {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
