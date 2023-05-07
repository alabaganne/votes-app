import { Outlet } from "react-router-dom";
function LogLayout() {
  return (
    <div className=" h-screen w-screen">
      <Outlet />
    </div>
  );
}

export default LogLayout;
