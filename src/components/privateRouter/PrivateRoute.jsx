import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../publicContext/Public-Context";

function PrivateRoute() {
  const { token } = useContext(Context);

  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}
export default PrivateRoute;
