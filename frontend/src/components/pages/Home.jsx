import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  sendFriendRequest,
  showFriends,
  showOutgoingRequest,
  showRecommendation,
} from "../../lib/friend.api";
import { Link } from "react-router";
import { UsersRound } from "lucide-react";
import FriendCard from "../UserCom/FriendCard";
const Home = () => {
  const [outgoingReqIds, setoutgoingReqIds] = useState(new Set());
  const queryClient = useQueryClient();
  // Friends End Point ->
  const {
    data: friends = [],
    isPending: friendPending,
    error: friendError,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: showFriends,
  });
  // Recommend End Point ->
  const {
    data: recommend = [],
    isPending: recommendPending,
    error: recommendUserError,
  } = useQuery({
    queryKey: ["recommend"],
    queryFn: showRecommendation,
  });
  // Show Outgoing Request End Point ->
  const {
    data: showRequest = [],
    isPending: showRequestPending,
    error: showRequestError,
  } = useQuery({
    queryKey: ["showRequest"],
    queryFn: showOutgoingRequest,
  });
  // Send Friend Request
  const {
    mutate: sendFriendRequestMutate,
    isPending: sendFriendRequestPending,
    error: sendFriendRequestError,
  } = useMutation({
    queryKey: ["sendFriendRequest"],
    queryFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["showRequest"] });
    },
  });

  useEffect(() => {
    const outgoindIds = new Set();
    if (outgoingReqIds && outgoingReqIds.length > 0) {
      outgoingReqIds.forEach((idx) => {
        outgoindIds.add(idx.id);
      });
      setoutgoingReqIds(outgoindIds);
    }
  }, [outgoingReqIds]);
  console.log(friends.friends);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <div className="flex items-center justify-between poppins-font">
          <h2 className="text-xl lg:text-2xl font-bold">My Friends</h2>
          <Link
            to={"/"}
            className="flex items-center gap-2 border rounded-3xl px-2 py-1"
          >
            <UsersRound className="size-4" />
            <span className="text-sm font-black ">Friend Requests</span>
          </Link>
        </div>
        {/* Friend show  */}
        {friendPending ? (
          <div className="">Loading....</div>
        ) : friends.length === 0 ? (
          <div className="">No Friends You Have</div>
        ) : (
          <div
            className="overflow-x-scroll pb-4 border border-gray-200 rounded-lg p-2"
            style={{
              scrollbarWidth: "thick",
              scrollbarColor: "#64748b #f1f5f9",
            }}
          >
            <div className="flex gap-4 w-max">
              {friends.friends.map((friend) => (
                <div key={friend._id} className="flex-shrink-0">
                  <FriendCard friend={friend} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
