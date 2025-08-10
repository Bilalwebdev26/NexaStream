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
import { BellDotIcon, CheckCircle, UsersRound } from "lucide-react";
import FriendCard from "../UserCom/FriendCard";
import { useSideBarStore } from "../../store/globalState";
import FriendSkeleton from "../UserCom/FriendSkeleton";
import RecommendUser from "../UserCom/RecommendUser";
import RecommendUserSkeleton from "../UserCom/RecommendUserSkeleton";

const Home = () => {
  // const [outgoingReqIds, setOutgoingReqIds] = useState(new Set());
  // const queryClient = useQueryClient();
  // const { showsidebar, setsideBar } = useSideBarStore();

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
    data: recommendUsers = [],
    isPending: recommendPending,
    error: recommendUserError,
  } = useQuery({
    queryKey: ["recommend"],
    queryFn: showRecommendation,
  });

  // // Outgoing Requests
  // const {
  //   data: showRequest,
  //   isPending: showRequestPending,
  //   error: showRequestError,
  // } = useQuery({
  //   queryKey: ["showRequest"],
  //   queryFn: showOutgoingRequest,
  // });
  // console.log("Outgoing Reqs : ",showRequest)

  // Mutation
  // const {
  //   mutate: sendFriendRequestMutate,
  //   isPending: sendFriendRequestPending,
  //   error: sendFriendRequestError,
  // } = useMutation({
  //   mutationFn: sendFriendRequest,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["showRequest"] });
  //   },
  // });

  // useEffect(() => {
  //   const outgoingIds = new Set();
  //   if (showRequest && showRequest.length > 0) {
  //     showRequest.forEach((req) => {
  //       outgoingIds.add(req.recipient._id);
  //     });
  //     setOutgoingReqIds(outgoingIds);
  //     console.log("Out going Friends Ids : ", outgoingReqIds);
  //   }
  // }, [outgoingReqIds]);

  //console.log("New Outgoing Reqs : ",outgoingReqIds);

  return (
    <div className="px-2 w-screen poppins-font">
      <div className={`w-full  `}>
        <div className="space-y-10 pt-6">
          <div className="">
            <div className="flex items-center justify-between poppins-font px-2">
              <h2 className="text-xl lg:text-2xl font-bold ">My Friends</h2>
              <div className="flex items-center justify-center gap-2">
                <Link
                  to={"/friends"}
                  className="flex items-center gap-2 border border-secondary rounded-3xl px-1 md:px-3 py-1"
                >
                  <UsersRound className="size-3 lg:size-4" />
                  <span className="text-xs lg:text-sm font-bold ">Friends</span>
                </Link>
                <Link
                  to={"/notification"}
                  className="flex items-center gap-2 border border-secondary rounded-3xl px-1 md:px-3 py-1 md:hidden"
                >
                  <BellDotIcon className="size-3 lg:size-4" />
                  <span className="text-xs lg:text-sm font-bold ">
                    Notification
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full">
            {/* Friend Show */}
            {friendPending ? (
              <div className="">
                <FriendSkeleton />
              </div>
            ) : friends.friends.length === 0 ? (
              <div className="flex justify-center h-36">
                <div className="mx-auto w-full bg-base-300 flex flex-col p-2 items-center justify-center">
                  <span className="text-2xl text-base/30 font-bold my-3 text-center">
                    You Don't Have Friends yet
                  </span>
                  <p className="text-xs md:text-sm mb-3 text-center">
                    Start connecting with others by sending friend requests!
                  </p>

                  <button className=" border px-4 py-2 rounded-lg hover:bg-gradient-to-tr from-primary to-secondary transition-all duration-200 hover:text-black hover:scale-95 hover:font-bold hover:border-none">
                    Find Friends
                  </button>
                </div>
              </div>
            ) : (
              <div className="">
                <FriendCard friends={friends} />
              </div>
            )}
          </div>
        </div>

        {/* Section Recommend User */}
        <section className="my-3 poppins-font">
          <div className="my-2">
            <h2 className="text-xl md:text-3xl font-bold text-white mt-6">Meet New Learners</h2>
            <p className="text-xs md:text-sm">
              Discover perfect Language exchange partners based on your profile.
            </p>
          </div>
          {recommendPending ? (
            <RecommendUserSkeleton />
          ) : recommendUsers.length < 1 ? (
            <div className="flex justify-center h-36">
                <div className="mx-auto w-full bg-base-300 flex flex-col p-2 items-center justify-center">
                  <span className="text-2xl text-base/30 font-bold my-3 text-center">
                    You Don't Have Recommend Friends yet
                  </span>
                  <p className="text-xs md:text-sm mb-3 text-center">
                    Reffer your Friends to Connect with you
                  </p>

                  <button className=" border px-4 py-2 rounded-lg hover:bg-gradient-to-tr from-primary to-secondary transition-all duration-200 hover:text-black hover:scale-95 hover:font-bold hover:border-none">
                    Reffer Friend
                  </button>
                </div>
              </div>
          ) : (
            <div className="w-full p-2">
              {console.log(recommendUsers)}
              <RecommendUser recommendUsers={recommendUsers} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
