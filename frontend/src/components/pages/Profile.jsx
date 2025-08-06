import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUserById, showOutgoingRequest } from "../../lib/friend.api";
import {
  Ban,
  CircleCheck,
  CrossIcon,
  Mail,
  MapPin,
  Send,
  UserRoundPlus,
  UserRoundX,
  X,
} from "lucide-react";
import useAuthUser from "../../hooks/useAuthUser";

const Profile = () => {
  const [checkReqSended, setCheckReqSent] = useState({});
  const [friendCheck, setFriendCheck] = useState({});
  const { id } = useParams();
  const { authUser } = useAuthUser();
  const {
    data: user,
    isPending: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ["getUserById"],
    queryFn: () => getUserById(id),
    onSuccess: () => {
      alert("We get you");
    },
  });
  const {
    data: outgoingReq,
    isPending: outgoingLoading,
    error: outgoingError,
  } = useQuery({
    queryFn: showOutgoingRequest,
  });

  useEffect(() => {
    if (!outgoingLoading) {
      console.log(outgoingReq[0]?.sender.toString());
      const checkReqSend = outgoingReq?.find(
        (out) => out.recipient._id.toString() === user?._id.toString()
      );
      const friend = user?.friends.find(
        (friend) => friend?.toString() === authUser?._id?.toString()
      );
      console.log("Check Req Send : ", checkReqSend);
      console.log("Check friend : ", friend);
      setCheckReqSent(checkReqSend);
      setFriendCheck(friend);
    }
  }, [outgoingReq, user]);

  console.log("Show Outgoing Req : ", outgoingReq);
  console.log("user", user);
  console.log("Auth user", authUser);
  const handleFriends = () => {};
  return (
    <div className="w-screen mt-2 poppins-font">
      <div className="w-full px-2 bg-base-300">
        {userLoading ? (
          <div className="w-screen mt-10 px-4 animate-pulse space-y-8">
            {/* Heading */}
            <div className="h-10 w-1/3 bg-gray-300 rounded-md"></div>

            {/* Top section - Image + Name + Friends */}
            <div className="flex items-center justify-between md:px-4 lg:px-10">
              {/* Image + Name */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
                <div className="h-6 w-32 bg-gray-300 rounded-md"></div>
              </div>
              {/* Friends */}
              <div className="w-24 h-14 bg-gray-300 rounded-md"></div>
            </div>

            {/* Email, Location, Gender */}
            <div className="flex flex-col items-center gap-6">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="w-1/2 h-12 bg-gray-300 rounded-md"
                ></div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 my-6">
              <div className="w-28 h-10 bg-gray-300 rounded-lg"></div>
              <div className="w-28 h-10 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        ) : (
          <div className="">
            <div className="">
              <h2 className="text-3xl font-black text-primary">
                {`${user?.fullName.split(" ")[0]}'s`}{" "}
                <span className="text-secondary">Profile</span>
              </h2>
            </div>
            {/* Top name + img + friends->Total */}
            <div className="flex items-center justify-between md:px-4 lg:px-10 mb-6">
              <div className="p-2 my-3 flex items-center gap-3">
                <img
                  src={user?.profilePic}
                  alt={user?.fullName}
                  className="w-14 h-14 md:w-20 md:h-20 ml-3"
                />
                <h3 className="font-bold text-xl md:text-2xl">
                  {user?.fullName}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <div
                  onClick={handleFriends}
                  className="bg-gradient-to-tl from-primary/20 to-secondary/10 border-base-300  border-3 p-2 rounded-md w-24 flex items-center flex-col"
                >
                  <span className="text-center font-bold">Friends</span>
                  <p className="text-center">{user?.friends?.length}</p>
                </div>
              </div>
            </div>
            {/*Email + Location + Gender */}
            {/* Email */}
            <div className="px-10 flex items-center flex-col gap-2 justify-center space-y-3 ">
              <div className="w-1/2">
                <label htmlFor="">Email</label>
                <div className="w-full flex items-center gap-2 p-2 border-2 border-secondary rounded-md">
                  <Mail className="text-secondary" />
                  <h3 className="font-semibold">{user?.email}</h3>
                </div>
              </div>
              {/* location */}
              <div className="w-1/2">
                <label htmlFor="">Location</label>
                <div className="w-full flex items-center gap-2 p-2 border-2 border-primary rounded-md">
                  <MapPin className="text-primary" />
                  <h3 className="font-semibold">{user?.location}</h3>
                </div>
              </div>
              {/* Gender */}
              <div className="w-1/2">
                <label htmlFor="">Gender</label>
                <div className="w-full flex items-center gap-2 p-2 border-2 border-primary rounded-md">
                  <MapPin className="text-primary" />
                  <h3 className="font-semibold">{user?.gender}</h3>
                </div>
              </div>
            </div>
            {/* Send Friend Req */}
            {/* First check its your friends or not if friend only chat option otherwise send request option  */}
            {/* And If Friends req sent show request sent with cancel request button */}
            {checkReqSended ? (
              <div className="flex items-center gap-2 justify-center w-full space-x-2 my-3">
                <button className="flex items-center p-2 border-primary border-2 rounded-lg gap-2 my-5 bg-green-600/10 hover:scale-95 transition-all duration-200">
                  <CircleCheck className="size-6 text-white" />
                  <span className="text-sm text-white font-semibold">
                    Already Sent
                  </span>
                </button>
                <button className="flex items-center p-2 border-secondary border-2 rounded-lg gap-2 bg-red-600 hover:scale-95 transition-all duration-200">
                  <X className="size-6 text-white" />
                  <span className="text-sm text-white font-semibold">
                    Cancel Request
                  </span>
                </button>
              </div>
            ) : !checkReqSended && !friendCheck ? (
              <div className="flex items-center gap-2 justify-center w-full space-x-2 my-3">
                <button className="flex items-center p-2 border-primary border-2 rounded-lg gap-2 my-5 bg-green-600 hover:scale-95 transition-all duration-200">
                  <UserRoundPlus className="size-6 text-white" />
                  <span className="text-sm text-white font-semibold">
                    Send request
                  </span>
                </button>
                <button className="flex items-center p-2 border-secondary border-2 rounded-lg gap-2 bg-red-600 hover:scale-95 transition-all duration-200">
                  <Ban className="size-6 text-white" />
                  <span className="text-sm text-white font-semibold">
                    Block
                  </span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 justify-center w-full space-x-2 my-3">
                <button className="flex items-center p-2 border-primary border-2 rounded-lg gap-2 my-5 bg-green-600 hover:scale-95 transition-all duration-200">
                  <Send className="size-6 text-white" />
                  <span className="text-sm text-white font-semibold">
                    Message
                  </span>
                </button>
                <button className="flex items-center p-2 border-secondary border-2 rounded-lg gap-2 bg-red-600 hover:scale-95 transition-all duration-200">
                  <UserRoundX className="size-6 text-white" />
                  <span className="text-sm text-white font-semibold">
                    UnFollow
                  </span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
