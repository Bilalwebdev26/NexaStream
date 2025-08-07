import React from "react";
import useAuthUser from "../../hooks/useAuthUser";
import { UserRound } from 'lucide-react';
const Notification = () => {
  const { authUser } = useAuthUser();
  return (
    <div className="poppins-font p-2">
      <div className="">
        <h2 className="font-bold text-3xl text-primary">
          {authUser.fullName}'s{" "}
          <span className="text-2xl font-semibold text-secondary">
            Notification
          </span>
        </h2>
      </div>
      <div className="px-4 mt-10 bg-base-300 py-3 rounded-sm">
        {/* Show Incoming Req with accept or reject btn */}
        <div className="flex items-center gap-2">
        <UserRound className="size-5 text-primary"/>
        <label htmlFor="">Friend Requests {" "}</label>
        <span className="w-5 h-5 text-xs bg-secondary font-semibold rounded-full flex items-center justify-center text-black">1</span>
        </div>
        <div className="">
          
        </div>
      </div>
    </div>
  );
};

export default Notification;
