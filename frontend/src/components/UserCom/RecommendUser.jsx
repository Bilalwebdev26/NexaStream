import { Locate, MapPin, UserRoundPlus } from "lucide-react";
import React from "react";
import { LANGUAGE_TO_FLAG } from "../../constant";

const RecommendUser = ({ recommendUsers }) => {
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
  return (
    <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2">
      {recommendUsers.map((recommend) => (
        <div className="border p-2 bg-gradient-to-r from-primary/70 to-secondary/70  rounded-md hover:bg-black/70 duration-200">
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
                <span className="text-xs font-semibold ">
                  Native :{" "}
                </span>
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
                <span className="text-xs font-semibold">
                  Learning :{" "}
                </span>
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
            <button className="w-full rounded-2xl flex items-center justify-center gap-2 px-2 py-2 bg-green-400 text-black hover:scale-95 transition-all duration-300">
              <UserRoundPlus className="size-4"/>
              <span className="text-[10px] md:text-sm font-semibold">Send Friend Request</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendUser;
