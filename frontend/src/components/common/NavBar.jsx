import React from "react";
import useAuthUser from "../../hooks/useAuthUser";
import { Link, useLocation, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../lib/auth.api";
import toast from "react-hot-toast";
import {
  BellIcon,
  Hamburger,
  HamburgerIcon,
  LogOut,
  Menu,
  ShipWheelIcon,
} from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import { useSideBarStore } from "../../store/globalState";
import SideBar from "./SideBar";

const NavBar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const navigate = useNavigate()
  const chatPage = location.pathname?.startsWith("/chat");
  const queryClient = useQueryClient();
  const { showsidebar, setsideBar } = useSideBarStore();
  const { mutate, isPending, error } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success(`${authUser?.fullName.split(" ")[0]} logout SuccessFully`);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
  const handleLogout = () => {
    mutate();
  };
  const handleBars = () => {
    setsideBar(!showsidebar)
  };
  return (
    <nav className=" w-screen border-b border-base-300 top-0 z-30 h-16 flex items-center poppins-font relative">
      <div className="container px-1 sm:px-2 lg:px-4 w-full">
        <div className={`flex items-center justify-between`}>
          {/* {!showsidebar && ( */}
          <div className="">
            <Link className="flex items-center  gap-2.5" to={"/"}>
              <ShipWheelIcon className="size-5 lg:size-9 text-primary" />
              <span
                // onClick={() => setsideBar(true)}
                className="text-lg lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider"
              >
                nexaStream
              </span>
            </Link>
          </div>
          {/* )} */}

          {/* ------------------------- */}
          <div className="flex items-center space-x-1 lg:space-x-2 ">
            <Link to={"/notification"} className="hidden md:flex items-center justify-center btn btn-ghost btn-circle">
              {/* <button className="btn btn-ghost btn-circle flex items-center"> */}
              <BellIcon className="size-6" />
              {/* </button> */}
            </Link>

            {/* Theme Selector */}
            <ThemeSelector />
            <div className="avatar">
              <div className="w-9 rounded-full">
                <img
                  src={authUser?.profilePic}
                  alt="profilePic"
                  rel="noreferrer"
                />
              </div>
            </div>
            {/* Hamburger */}
            <div onClick={handleBars} className="btn btn-ghost btn-circle">
              <Menu />
            </div>
            {/* Logout */}
            <div className="">
              <div className="btn btn-ghost btn-circle" onClick={handleLogout}>
                <LogOut className="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
