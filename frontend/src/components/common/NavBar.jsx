import React from "react";
import useAuthUser from "../../hooks/useAuthUser";
import { Link, useLocation } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../lib/auth.api";
import toast from "react-hot-toast";
import { BellIcon, LogOut, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import { useSideBarStore } from "../../store/globalState";
import SideBar from "./SideBar";

const NavBar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
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
  return (
    <nav className="bg-base-200 w-full border-b border-base-300 top-0 z-30 h-16 flex items-center poppins-font relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center ${
            showsidebar ? "justify-end" : "justify-between"
          }  w-full space-x-3`}
        >
          {!showsidebar && (
            <div className="">
              <Link
                to={"/"}
                className="flex items-center justify-start gap-2.5"
              >
                <ShipWheelIcon className="size-5 lg:size-9 text-primary" />
                <span
                  onClick={() => setsideBar(true)}
                  className="text-lg lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider"
                >
                  nexaStream
                </span>
              </Link>
            </div>
          )}

          {/* ------------------------- */}
          <div className="flex items-center justify-end ">
            <Link to={"/notification"} className="btn btn-ghost btn-circle">
              {/* <button className="btn btn-ghost btn-circle flex items-center"> */}
              <BellIcon className="" />
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
            {/* Logout */}
            <div className="">
              <div className="btn btn-ghost btn-circle" onClick={handleLogout}>
                <LogOut className="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 z-50">
        {" "}
        <SideBar />
      </div>
    </nav>
  );
};

export default NavBar;
