import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../publicContext/Public-Context";

function PublicRoute() {
  const { token } = useContext(Context);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
export default PublicRoute;
