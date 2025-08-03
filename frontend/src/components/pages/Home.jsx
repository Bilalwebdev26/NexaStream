// import React, { useEffect, useState } from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import {
//   sendFriendRequest,
//   showFriends,
//   showOutgoingRequest,
//   showRecommendation,
// } from "../../lib/friend.api";
// import { Link } from "react-router";
// import { UsersRound } from "lucide-react";
// import FriendCard from "../UserCom/FriendCard";
// import { useSideBarStore } from "../../store/globalState";
// const Home = () => {
//   const [outgoingReqIds, setoutgoingReqIds] = useState(new Set());
//   const queryClient = useQueryClient();
//   const { showsidebar,setsideBar } = useSideBarStore();
//   // Friends End Point ->
//   const {
//     data: friends = [],
//     isPending: friendPending,
//     error: friendError,
//   } = useQuery({
//     queryKey: ["friends"],
//     queryFn: showFriends,
//   });
//   // Recommend End Point ->
//   const {
//     data: recommend = [],
//     isPending: recommendPending,
//     error: recommendUserError,
//   } = useQuery({
//     queryKey: ["recommend"],
//     queryFn: showRecommendation,
//   });
//   // Show Outgoing Request End Point ->
//   const {
//     data: showRequest = [],
//     isPending: showRequestPending,
//     error: showRequestError,
//   } = useQuery({
//     queryKey: ["showRequest"],
//     queryFn: showOutgoingRequest,
//   });
//   // Send Friend Request
//   const {
//     mutate: sendFriendRequestMutate,
//     isPending: sendFriendRequestPending,
//     error: sendFriendRequestError,
//   } = useMutation({
//     queryKey: ["sendFriendRequest"],
//     queryFn: sendFriendRequest,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["showRequest"] });
//     },
//   });

//   useEffect(() => {
//     const outgoindIds = new Set();
//     if (outgoingReqIds && outgoingReqIds.length > 0) {
//       outgoingReqIds.forEach((idx) => {
//         outgoindIds.add(idx.id);
//       });
//       setoutgoingReqIds(outgoindIds);
//     }
//   }, [outgoingReqIds]);
//   console.log(friends.friends);

//   return (
// <div className={`w-full z-30 sm:w-[90%] md:w-[80%] lg:w-[70%] px-4 sm:px-6 lg:px-8 bg-black`}>

//       <div className="space-y-10">
//         <div className="flex items-center justify-between poppins-font">
//           <h2 className="text-xl lg:text-2xl font-bold">My Friends</h2>
//           <Link
//             to={"/"}
//             className="flex items-center gap-2 border rounded-3xl px-2 py-1"
//           >
//             <UsersRound className="size-4" />
//             <span className="text-sm font-black ">Friend Requests</span>
//           </Link>
//         </div>
//         {/* Friend show  */}
//         {friendPending ? (
//           <div className="">Loading....</div>
//         ) : friends.length === 0 ? (
//           <div className="">No Friends You Have</div>
//         ) : (
//           <div
//             className="overflow-x-auto pb-4 border border-gray-200 rounded-lg p-2 "
//             style={{
//               width: "100%", // Set max width for parent (you can also use Tailwind `max-w-3xl` or similar)
//               maxWidth: "100%",

//             }}
//           >
//             <div className="flex gap-4">
//               {friends.friends.map((friend) => (
//                 <div key={friend._id} className="flex-shrink-0">
//                   <FriendCard friend={friend} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  sendFriendRequest,
  showFriends,
  showOutgoingRequest,
  showRecommendation,
} from "../../lib/friend.api";
import { Link } from "react-router"; // ✅ Correct import
import { UsersRound } from "lucide-react";
import FriendCard from "../UserCom/FriendCard";
import { useSideBarStore } from "../../store/globalState";
import FriendSkeleton from "../UserCom/FriendSkeleton";

const Home = () => {
  const [outgoingReqIds, setOutgoingReqIds] = useState(new Set());
  const queryClient = useQueryClient();
  const { showsidebar, setsideBar } = useSideBarStore();

  // Friends
  const {
    data: friends = { friends: [] },
    isPending: friendPending,
    error: friendError,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: showFriends,
  });

  // Recommendation
  const {
    data: recommend = [],
    isPending: recommendPending,
    error: recommendUserError,
  } = useQuery({
    queryKey: ["recommend"],
    queryFn: showRecommendation,
  });

  // Outgoing Requests
  const {
    data: showRequest = [],
    isPending: showRequestPending,
    error: showRequestError,
  } = useQuery({
    queryKey: ["showRequest"],
    queryFn: showOutgoingRequest,
  });

  // Mutation
  const {
    mutate: sendFriendRequestMutate,
    isPending: sendFriendRequestPending,
    error: sendFriendRequestError,
  } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["showRequest"] });
    },
  });

  // Outgoing request IDs setup (optional usage)
  useEffect(() => {
    if (showRequest.length > 0) {
      const ids = new Set(showRequest.map((item) => item.id));
      setOutgoingReqIds(ids);
    }
  }, [showRequest]);

  return (
    <div className="px-2 w-screen">
      <div className={`w-full  `}>
        <div className="space-y-10 pt-6">
          <div className="">
            <div className="flex items-center justify-between poppins-font">
              <h2 className="text-xl lg:text-2xl font-bold text-white">
                My Friends
              </h2>
              <Link
                to={"/"}
                className="flex items-center gap-2 border border-white text-white rounded-3xl px-3 py-1"
              >
                <UsersRound className="size-4" />
                <span className="text-sm font-bold">Friend Requests</span>
              </Link>
            </div>
          </div>
          <div className="w-full">
            {/* Friend Show */}
            {friendPending ? (
              <div className=""><FriendSkeleton/></div>
            ) : friends?.friends?.length === 0 ? (
              <div className="text-white">No Friends You Have</div>
            ) : (
              <div className="">
                <FriendCard friends={friends} />
              </div>
            )}
          </div>
        </div>
        {/* Section Recommend User */}
      </div>
    </div>
  );
};

export default Home;
