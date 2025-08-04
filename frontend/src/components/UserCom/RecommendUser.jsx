import {
  CheckCircle,
  CheckCircle2,
  Loader,
  Locate,
  MapPin,
  UserRoundPlus,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { LANGUAGE_TO_FLAG } from "../../constant";
import { showOutgoingRequest, sendFriendRequest } from "../../lib/friend.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const RecommendUser = ({ recommendUsers }) => {
  const [outgoingReqIds, setOutgoingReqIds] = useState(new Set());
  const [loadingId, setLoadingId] = useState(null);
  const queryClient = useQueryClient();
  // Outgoing Requests
  const {
    data: showRequest,
    isPending: showRequestPending,
    error: showRequestError,
  } = useQuery({
    queryKey: ["showRequest"],
    queryFn: showOutgoingRequest,
  });
  const {
    mutate,
    isPending: loading,
    error: sendFriendRequestError,
  } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["showRequest"] });
    },
  });

  useEffect(() => {
    const outgoingReqs = new Set();
    if (showRequest && showRequest.length > 0) {
      showRequest.forEach((req) => outgoingReqs.add(req.recipient._id));
      setOutgoingReqIds(outgoingReqs);
      console.log("Inside For Each : ", showRequest);
    }
  }, [showRequest]);
  console.log("I create Outgoing : ", outgoingReqIds);
  console.log("Fetch create Outgoing : ", showRequest);

  const getLangFlag = (lang) => {
    if (!lang) return null;
    const lowerLang = lang.toLowerCase();
    const countryCode = LANGUAGE_TO_FLAG[lowerLang];
    if (countryCode) {
      return (
        <img
          className="h-3 inline-block"
          src={`https://flagcdn.com/24x18/${countryCode}.png`}
          alt={`${lowerLang}-flag`}
        />
      );
    }
  };
  const handleRecommendUser = (id) => {
    if (!id) {
      return;
    }
    setLoadingId(id);
    mutate(id);
    console.log("Send Frind mutaton", id);
  };
  return (
    <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2">
      {recommendUsers.map((recommend) => {
        const checkAlreadySent = outgoingReqIds.has(recommend._id);
        return (
          <div
            key={recommend._id}
            className="border p-2  rounded-md hover:bg-black/70 duration-200"
          >
            {/* profile Info */}
            <div className="flex items-center gap-2">
              <div className="">
                <img
                  className="w-14 h-14"
                  src={recommend.profilePic}
                  alt={recommend.fullName}
                />
              </div>
              <div className="">
                <h3 className="text-lg font-bold">
                  {recommend.fullName.split("")[0].toUpperCase() +
                    recommend.fullName.slice(1)}
                </h3>
                <p className="text-[10px] flex items-center gap-1 line-clamp-1">
                  <MapPin className="size-3" /> {recommend.location}
                </p>
              </div>
            </div>
            {/* learner */}
            <div className="">
              <div className="w-full flex items-center gap-1">
                <div className="w-1/2">
                  <span className="text-xs font-semibold ">Native : </span>
                  <div className="w-full border rounded-xl text-center flex items-center justify-center gap-2  text-xs py-1">
                    <span className="">
                      {" "}
                      {getLangFlag(recommend.nativeLanguage)}
                    </span>

                    <span className="font-semibold">
                      {recommend.nativeLanguage}
                    </span>
                  </div>
                </div>
                <div className="w-1/2">
                  <span className="text-xs font-semibold">Learning : </span>
                  <div className="w-full border rounded-xl text-center flex items-center justify-center gap-2  text-xs py-1">
                    <span className="">
                      {" "}
                      {getLangFlag(recommend.learningLanguage)}
                    </span>

                    <span className="font-semibold">
                      {recommend.learningLanguage}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Bio */}
            <div className="my-2">
              <p className="text-xs line-clamp-1">{recommend.bio}</p>
            </div>
            {/* button */}
            <div className="">
              {checkAlreadySent ? (
                <button className="w-full rounded-2xl flex items-center justify-center gap-2 px-2 py-2 bg-green-400/10 cursor-not-allowed ">
                  <CheckCircle className="size-3 text-white/60" />
                  <span className="text-white/60 text-xs">Request Sent</span>
                </button>
              ) : (
                <button
                  onClick={() => handleRecommendUser(recommend._id)}
                  className="w-full rounded-2xl flex items-center justify-center gap-2 px-2 py-2 bg-green-400 text-black hover:scale-95 transition-all duration-300"
                >
                  {loading && loadingId === recommend._id ? (
                    <div className="flex items-center justify-center">
                      <Loader className="size-4 animate-spin" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <UserRoundPlus className="size-4" />
                      <span className="text-[10px] md:text-sm font-semibold">
                        Send Friend Request
                      </span>
                    </div>
                  )}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecommendUser;
