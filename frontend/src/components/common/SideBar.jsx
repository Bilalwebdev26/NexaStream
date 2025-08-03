import React, { useState } from "react";
import { Bell, CircleX, HomeIcon, ShipWheelIcon, Users } from "lucide-react";
import { useLocation, Link } from "react-router";
import useAuthUser from "../../hooks/useAuthUser";
import { useSideBarStore } from "../../store/globalState";

const SideBar = () => {
  const location = useLocation();
  const currentLocation = location.pathname;
  const { authUser } = useAuthUser();
  //const [sideBar, handleSideBar] = useState(false);
  console.log(authUser);
  const { showsidebar, setsideBar } = useSideBarStore();
  console.log("SHow side bar from sidebar : ", showsidebar);
  return (
    <aside
      className={`w-64 bg-base-200 border-b z-50 fixed top-0 left-0 h-screen transition-all duration-300 ease-in-out ${
        showsidebar ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="absolute right-2 my-2">
        <CircleX
          //onClick={() => handleSideBar(!sideBar)}
          onClick={() => setsideBar(!showsidebar)}
          className="cursor-pointer"
        />
      </div>
      <div className="p-5 border-b border-base-300 mt-2">
        <Link to={"/"} className="flex items-center justify-center gap-2.5">
          <ShipWheelIcon className="w-9 h-9 text-primary" />
          <span className="font-semibold font-mono text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
            nexaStream
          </span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-3">
        <Link
          to={"/"}
          className={`flex items-center gap-3 justify-start w-full px-3 normal-case btn btn-ghost ${
            currentLocation === "/" ? "btn-active" : ""
          }`}
        >
          <HomeIcon className="text-base-content opacity-70" />
          <span>Home</span>
        </Link>
        <Link
          to={"/friends"}
          className={`flex items-center gap-3 justify-start w-full px-3 normal-case btn btn-ghost ${
            currentLocation === "/friends" ? "btn-active" : ""
          }`}
        >
          <Users />
          <span>Friends</span>
        </Link>
        <Link
          to={"/notification"}
          className={`flex items-center gap-3 justify-start w-full px-3 normal-case btn btn-ghost ${
            currentLocation === "/notification" ? "btn-active" : ""
          }`}
        >
          <Bell />
          <span>Notification</span>
        </Link>
      </nav>
      {/* User Profile Section-Online- */}
      <div className="p-4 border-t border-base-300 mt-auto">
        <div className="flex space-x-2">
          {/* Image */}
          <div className="">
            <img className="size-12" src={authUser?.profilePic} alt="profile" />
          </div>
          {/* Name */}
          <div className="flex flex-col">
            <span className="font-semibold font-mono text-base">
              {authUser?.fullName}
            </span>
            <div className="flex gap-1 justify-start items-center">
              <span className="size-2 rounded-full bg-success inline-block" />
              <span className="text-green-600 text-xs font-bold">Online</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
