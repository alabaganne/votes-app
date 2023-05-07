import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function MainLayout() {
  return (
    <div className="w-screen h-screen">
      <div className=" w-screen h-[10%] flex justify-center">
        <Navbar />
      </div>
      <div className=" w-screen h-[90%] flex justify-center">
        <Outlet />
      </div>
    </div>
  );
}
