import { Outlet, Navigate } from "react-router-dom";
import { getToken } from "./service/BackendService";

const ProtectedRoutes = () => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;

