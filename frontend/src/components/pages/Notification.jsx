// import React from "react";
// import useAuthUser from "../../hooks/useAuthUser";
// import { Check, Loader, UserRound, X } from "lucide-react";
// import {
//   useMutation,
//   useQueries,
//   useQuery,
//   useQueryClient,
// } from "@tanstack/react-query";
// import { acceptReq, rejectReq, showInComConReq } from "../../lib/friend.api";
// import { useState } from "react";
// const Notification = () => {
//   const [idx, setIdx] = useState(null);
//   const { authUser } = useAuthUser();
//   const queryClient = useQueryClient();
//   const { data, isPending:reqLoading, error } = useQuery({
//     queryKey: ["showInComRequests"],
//     queryFn: showInComConReq,
//   });
//   // use mutation for accept Req
//   const {
//     mutate: acceptMutate,
//     isPending: acceptLoading,
//     error: acceptError,
//   } = useMutation({
//     mutationFn: acceptReq,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["showInComRequests"] });
//     },
//   });
//   const handleAccept = (id) => {
//     if (!id) return;
//     acceptMutate(id);
//     setIdx(id);
//   };
//   // use mutation for delete Req
//   const {
//     mutate: rejectMutate,
//     isPending: rejectLoading,
//     error: rejectError,
//   } = useMutation({
//     mutationFn: rejectReq,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["showInComRequests"] });
//     },
//   });
//   const rejectRequest = (id) => {
//     if (!id) return;
//     rejectMutate(id);
//     setIdx(id);
//   };
//   console.log("Data : ", data);
//   return (
//     <div className="poppins-font p-2 w-screen">
//       <div className="">
//         <h2 className="font-extrabold text-3xl text-primary">
//           {authUser.fullName}'s{" "}
//           <span className="text-2xl font-semibold text-secondary">
//             Notification
//           </span>
//         </h2>
//       </div>
//       <div className="px-4 mt-10 bg-base-300 py-3 rounded-sm w-full">
//         {/* Show Incoming Req with accept or reject btn */}
//         <div className="flex items-center gap-2 my-2">
//           <UserRound className="size-5 text-primary" />
//           <label htmlFor="" className="font-bold">
//             Friend Requests{" "}
//           </label>
//           <span className="w-5 h-5 text-xs bg-secondary font-semibold rounded-full flex items-center justify-center text-white">
//             {data?.incommingReq.length}
//           </span>
//         </div>
//         <div className="space-y-2 w-full">
//           {reqLoading?(
//             <div className=""></div>
//           ):(
//             data?.incommingReq.length<1?(
//               <div className="p-2 bg-base-100 rounded-md flex items-center justify-center flex-col space-y-3">
//                 <h2 className="text-xl md:text-3xl font-bold mt-5">No Friend requests.</h2>
//                 <p className="text-xs md:text-sm text-center  ">You have no incoming friend requests.</p>
//                 <button className="px-3 py-2 mb-5 h-10 transition-all duration-300 border hover:border-none hover:bg-gradient-to-tr from-primary/70 to-secondary/70 text-sm font-bold rounded-md">Explore Friends</button>
//               </div>
//             ):(<></>)
//           )}
//           {data?.incommingReq.map((incomming) => (
//             <div
//               key={incomming.sender._id}
//               className="bg-base-100 p-2 rounded-md flex justify-between w-full"
//             >
//               {/* Name Img Lang */}
//               <div className="flex items-center gap-2">
//                 <img
//                   src={incomming.sender.profilePic}
//                   alt={incomming.sender.fullName}
//                   className="h-10 w-10"
//                 />
//                 <div className="space-y-1">
//                   <span className="font-bold text-xs sm:text-lg">
//                     {incomming.sender.fullName}
//                   </span>
//                   <div className="flex items-center gap-2">
//                     <div className="hidden sm:flex flex-col ">
//                       <label
//                         htmlFor=""
//                         className="font-medium ml-1 text-[8px]  sm:text-xs"
//                       >
//                         Native
//                       </label>
//                       <span className="text-sm w-24 text-center mt-[2px] rounded-xl bg-secondary border-secondary border-2 font-semibold text-white px-1">
//                         {incomming.sender.nativeLanguage}
//                       </span>
//                     </div>
//                     <div className="flex flex-col ">
//                       <label
//                         htmlFor=""
//                         className="font-medium ml-1 text-[8px] text-start sm:text-xs"
//                       >
//                         Learning
//                       </label>
//                       <span className="text-xs sm:text-sm w-20 md:w-24 mt-[2px] text-center border-2 font-semibold border-primary  rounded-xl px-1">
//                         {incomming.sender.learningLanguage}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {/* Buttons */}
//               <div className="flex items-center justify-center gap-2 ">
//                 <button
//                   onClick={() => {
//                     handleAccept(incomming._id);
//                   }}
//                   className="flex items-center justify-center bg-green-600 hover:bg-green-800 transition-all duration-200 px-1 rounded-md"
//                 >
//                   {idx === incomming._id && acceptLoading ? (
//                     <div className="px-8 py-1">
//                       <Loader className="animate-spin size-5" />
//                     </div>
//                   ) : (
//                     <>
//                       <Check className="size-4 md:size-5 text-white font-bold" />
//                       <span className="text-xs sm:text-sm font-semibold text-white px-1 sm:px-2 py-1">
//                         Accept
//                       </span>
//                     </>
//                   )}
//                 </button>
//                 <button
//                   onClick={() => rejectRequest(incomming._id)}
//                   className="flex items-center justify-center bg-red-600 hover:bg-red-800 transition-all duration-200 px-1 rounded-md"
//                 >
//                   {idx === incomming._id && rejectLoading ? (
//                     <div className="px-8 py-1">
//                       <Loader className="animate-spin size-5" />
//                     </div>
//                   ) : (
//                     <>
//                       <X className="size-4 md:size-5 text-white font-bold" />
//                       <span className="text-xs sm:text-sm font-semibold text-white px-1 sm:px-2 py-1">
//                         Reject
//                       </span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Notification;
import React from 'react'

const Notification = () => {
  return (
    <div>Notification</div>
  )
}

export default Notification
