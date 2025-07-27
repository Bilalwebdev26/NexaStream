import React from "react";
import useAuthUser from "../../hooks/useAuthUser";
import { Link, useLocation } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../lib/auth.api";
import toast from "react-hot-toast";
import { BellIcon, LogOut, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";

const NavBar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const chatPage = location.pathname?.startsWith("/chat");
  const queryClient = useQueryClient();
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
    <nav className="sticky bg-base-200 border-b border-base-300 top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {chatPage && (
            <div className="pl-5">
              <Link to={"/"} className="flex items-center gap-2.5">
                <ShipWheelIcon className="size-9 text-primary" />
                <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                  nexaStream
                </span>
              </Link>
            </div>
          )}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to={"/notification"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="size-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>
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
    </nav>
  );
};

export default NavBar;
