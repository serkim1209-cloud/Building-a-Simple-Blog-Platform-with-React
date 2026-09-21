import { Navigate,Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthoContext } from "../../App";

export function PrivateRoute() {
  const{token}=useContext(AuthoContext)

  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet/>
}
