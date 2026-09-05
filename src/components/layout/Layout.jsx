import { Outlet } from "react-router-dom";
import Navigation from "../navigation/Navigation";

function Layout() {
  return (
    <div className="mx-auto max-w-[1280px]">
      <Navigation />
      <Outlet />
    </div>
  );
}
export default Layout;
