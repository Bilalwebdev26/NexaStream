import { useQuery } from "@tanstack/react-query";
import React from "react";
import { showFriends } from "../../lib/friend.api";
import { Link, useNavigate } from "react-router";

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
  const navigate = useNavigate()
  console.log("Show Friends : ", friends);
  const handleNavigate = (id)=>{
    navigate(`/friend/${id}`)
  }
  return (
    <div className="py-2 px-4">
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
          ) : friends.length === 0 ? (
            <p>No Friends</p>
          ) : (
            <div className="w-full space-y-2">
              {friends.friends.map((friend) => (
                
                  <div onClick={()=>handleNavigate(friend._id)} key={friend._id} className="w-full bg-black/90 px-2 py-4 rounded-lg border flex justify-between cursor-pointer hover:bg-black/70 duration-200 transition-all">
                    {/* Profile+Name */}
                    <div className="flex items-center gap-2">
                      <img
                        className="w-8 h-8"
                        src={friend.profilePic}
                        alt={friend.fullName}
                      />
                      <span className="text-sm font-semibold text-white hover:underline">
                        {friend.fullName}
                      </span>
                    </div>
                    {/* Message+Remove */}
                    <div className="flex items-center gap-2">
                      <button className="bg-white text-black rounded-lg px-2 py-1 text-sm font-semibold hover:scale-95 duration-200 transition-all">
                        Message
                      </button>
                      <button className="bg-red-600 text-white rounded-lg px-2 py-1 text-sm font-semibold hover:scale-95 duration-200 transition-all">
                        Remove
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
