import { Outlet } from "react-router-dom";
import Navigation from "../navigation/Navigation";

function Layout({ vision, setVision }) {
  return (
    <div className="mx-auto max-w-[1280px]">
      <Navigation vision={vision} setVision={setVision} />
      <Outlet />
    </div>
  );
}
export default Layout;
