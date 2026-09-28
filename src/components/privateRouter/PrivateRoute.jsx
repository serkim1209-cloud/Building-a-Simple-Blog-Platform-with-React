import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../Private-Context.jsx/Private-Context";

export function PrivateRoute() {
  const { token } = useContext(Context);

  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}

export function PublicRoute(){
    const { token } = useContext(Context);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
