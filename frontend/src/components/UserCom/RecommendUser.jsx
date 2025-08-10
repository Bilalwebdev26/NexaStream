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
import { useNavigate } from "react-router";
const RecommendUser = ({ recommendUsers }) => {
  const [outgoingReqIds, setOutgoingReqIds] = useState(new Set());
  const [loadingId, setLoadingId] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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
  const HandleProfile = (id) => {
    if (!id) return null;
    navigate(`/profile/${id}`);
    window.location.reload(); // force full refresh
  };

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
            className="border p-2 cursor-pointer hover:bg-secondary/10 rounded-md hover:scale-105 duration-200"
          >
            {/* profile Info */}
            <div
              onClick={() => HandleProfile(recommend._id)}
              className="flex items-center gap-2"
            >
              <div className="">
                <img
                  className="w-10 h-10 md:w-14 md:h-14"
                  src={recommend.profilePic}
                  alt={recommend.fullName}
                />
              </div>
              <div className="">
                <h3
                  className="text-xs md:text-lg font-bold hover:underline"
                >
                  {recommend.fullName.split("")[0].toUpperCase() +
                    recommend.fullName.slice(1)}
                </h3>
                {/* small screen */}
                <p className="text-[10px] flex items-center gap-1 line-clamp-1  md:hidden">
                  <MapPin className="size-3" />{" "}
                  {`${recommend.location.split(" ")[0]}`}
                </p>
                {/* large screen */}
                <p className="text-[10px] md:flex items-center gap-1 line-clamp-1 hidden">
                  <MapPin className="size-3" /> {`${recommend.location}`}
                </p>
              </div>
            </div>
            {/* learner */}
            <div className="">
              <div className="w-full flex items-center gap-1">
                <div className="w-1/2">
                  <span className="text-[9px] md:text-xs font-semibold ">Native : </span>
                  <div className="w-full border rounded-xl text-center flex items-center justify-center gap-2 text-[10px]  md:text-xs py-1">
                    <span className="">
                      {" "}
                      {getLangFlag(recommend.nativeLanguage)}
                    </span>

                    <span className="hidden md:block text-xs font-semibold">
                      {recommend.nativeLanguage}
                    </span>
                  </div>
                </div>
                <div className="w-1/2">
                  <span className="text-[9px] md:text-xs font-semibold">Learning : </span>
                  <div className="w-full border rounded-xl text-center flex items-center justify-center gap-2  text-xs py-1">
                    <span className="">
                      {" "}
                      {getLangFlag(recommend.learningLanguage)}
                    </span>

                    <span className="hidden md:block font-semibold">
                      {recommend.learningLanguage}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Bio */}
            <div className="my-2">
              <p className="text-[10px] md:text-xs line-clamp-1">{recommend.bio}</p>
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
                      <UserRoundPlus className="size-3 md:size-4" />
                      <span className="text-[10px] md:text-sm font-semibold">
                        Send Request
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
