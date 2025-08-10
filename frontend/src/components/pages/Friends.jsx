import { useQuery } from "@tanstack/react-query";
import React from "react";
import { showFriends } from "../../lib/friend.api";
import { Link, useNavigate } from "react-router";
import { Send, UserMinus } from "lucide-react";

const Friends = () => {
  // Friends
  const {
    data: friends = { friends: [] },
    isPending: friendPending,
    error: friendError,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: showFriends,
  });
  console.log("Friends", friends.length);
  const navigate = useNavigate();
  console.log("Show Friends : ", friends);
  const handleNavigate = (id) => {
    window.location.reload(); // force full refresh
    navigate(`/profile/${id}`);
  };
  return (
    <div className="py-2 px-4 poppins-font">
      <div className="">
        <h2 className="text-3xl font-black my-3">My Friends</h2>
        <div className="">
          {friendPending ? (
            <div className="space-y-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full bg-black/90 px-2 py-4 rounded-lg border flex justify-between animate-pulse"
                >
                  {/* Profile + Name Skeleton */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-700"></div>
                    <div className="w-24 h-4 bg-gray-700 rounded"></div>
                  </div>
                  {/* Buttons Skeleton */}
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-6 bg-gray-700 rounded"></div>
                    <div className="w-16 h-6 bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : friends.friends.length === 0 ? (
            <div className="flex justify-center h-80">
              <div className="mx-auto w-full bg-base-300 flex flex-col p-2 items-center justify-center">
                <span className="text-2xl text-base/30 font-bold my-3">
                  You Don't Have Friends yet
                </span>
                <p className="text-sm mb-3">
                  Start connecting with others by sending friend requests!
                </p>
                <button className="inline-block border px-4 py-2 rounded-lg hover:bg-gradient-to-tr from-primary to-secondary transition-all duration-200 hover:text-black hover:scale-90 hover:font-bold hover:border-none">
                  Find Friends
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full space-y-2">
              {friends.friends.map((friend) => (
                <div
                  onClick={() => handleNavigate(friend._id)}
                  key={friend._id}
                  className="w-full bg-base-300 box-border  px-2 py-4 rounded-lg border flex justify-between duration-200 transition-all"
                >
                  {/* Profile+Name */}
                  <div className="flex items-center gap-2">
                    <img
                      className="w-8 h-8"
                      src={friend.profilePic}
                      alt={friend.fullName}
                    />
                    <span className="text-xs md:text-sm font-semibold text-white hover:underline">
                      {friend.fullName}
                    </span>
                  </div>
                  {/* Message+Remove */}
                  <div className="flex items-center gap-2">
                    <button className="bg-white text-black flex items-center gap-2 rounded-md p-1 md:px-3 md:py-2 text-xs font-semibold hover:bg-gray-200 duration-200 transition-all">
                      <Send className="size-3 md:size-5"/>
                      Message
                    </button>
                    <button className="bg-red-600 flex items-center gap-2 text-white rounded-md p-1 md:px-3 md:py-2 text-xs font-semibold hover:bg-red-800 duration-200 transition-all">
                      <UserMinus className="size-3 md:size-5"/>
                      Unfriend 
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;
