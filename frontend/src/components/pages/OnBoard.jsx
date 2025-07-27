import React, { useState } from "react";
import useAuthUser from "../../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onboardUser } from "../../lib/auth.api";
import { Loader, Replace, ShuffleIcon } from "lucide-react";
import { LANGUAGE_TO_FLAG, LANGUAGES } from "../../constant";
import { Globe } from "lucide-react";
import { toast } from "react-hot-toast";
const OnBoard = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    fullName: authUser.fullName || "",
    bio: authUser.bio || "",
    nativeLanguage: authUser.nativeLanguage || "",
    learningLanguage: authUser.learningLanguage || "",
    location: authUser.location || "",
    profilePic: authUser.profilePic || "",
  });
  const { mutate, error, isPending } = useMutation({
    mutationFn: onboardUser,
    onError: () => {
      toast.error(
        `${authUser?.fullName.split(" ")[0]} failed to Onboard Profile.`
      );
    },
    onSuccess: () => {
      toast.success(
        `${authUser?.fullName.split(" ")[0]} your Profile Onboard SuccessFully`
      );
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    mutate(formData);
  };
  const changeAvatar = () => {
    let random = "";
    if (authUser.gender === "female") {
      random = Math.floor((Math.random() * 0.5 + 0.5) * 100 + 1);
      console.log("Female :", random);
    }
    if (authUser.gender === "male") {
      random = Math.floor(Math.random() * 50 + 1);
      console.log("Male :", random);
    }
    if (authUser.gender === "Prefer not to say") {
      random = Math.floor(Math.random() * 100 + 1);
    }
    setFormData({
      ...formData,
      profilePic: `https://avatar.iran.liara.run/public/${random}.png`,
    });
  };
  return (
    <div
      className="bg-base-100 min-h-screen flex items-center justify-center p-4"
      data-theme="forest"
    >
      {error && (
        <span className="alert alert-warning bg-red-500">{error.message}</span>
      )}
      {error && console.log("Error : ", error)}
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-center sm:text-3xl text-2xl font-bold mb-6">
            Complete Your Profile
          </h1>
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* ---------------Pic Section Section---------------- */}
            <div className="flex items-center justify-center flex-col space-y-2">
              <img
                src={formData.profilePic}
                alt="profile"
                className="w-[120px] h-[120px]"
              />
              <button
                type="button"
                className="bg-emerald-500 hover:bg-emerald-600 hover:scale-95 transition-all duration-200 text-black  text-xs font-semibold flex px-4 py-2 rounded-2xl"
                onClick={changeAvatar}
              >
                <ShuffleIcon className="w-4 h-4 mr-2" />
                Generate Random Avatar
              </button>
            </div>
            {/* ---------------Input Section---------------- */}
            <div className="flex flex-col w-full p-3">
              <label className="text-xs font-semibold mb-1 ml-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="Enter Full Name"
                className="w-full rounded-3xl px-3 py-1 outline-none border border-gray-100 "
                required
              />
              <label className="text-xs font-semibold mb-1 mt-2 ml-1">
                Bio
              </label>

              <textarea
                type="text"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Enter Bio"
                className="w-full rounded-3xl px-3 py-1 outline-none border border-gray-100 "
              ></textarea>
              <div className="flex flex-col md:flex-row w-full md:space-x-2">
                {/* Native section */}
                <div className="w-full md:w-1/2">
                  <label className="text-xs font-semibold mb-1 ml-1">
                    Native Language
                  </label>
                  <select
                    value={formData.nativeLanguage} // state bind
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        nativeLanguage: e.target.value,
                      })
                    }
                    className="w-full rounded-3xl px-4 py-2 border border-gray-300"
                  >
                    <option value="" disabled defaultChecked>
                      Select your Native Language
                    </option>
                    {LANGUAGES.map((lang) => (
                      <option
                        className="rounded border"
                        key={`native-ln-${lang}`}
                        value={lang.toLowerCase()}
                      >
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Learning Section */}
                <div className="w-full md:w-1/2">
                  <label className="text-xs font-semibold mb-2 ml-1">
                    Learning Language
                  </label>
                  <select
                    value={formData.learningLanguage} // state bind
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        learningLanguage: e.target.value,
                      })
                    }
                    className="w-full rounded-3xl px-4 py-2 border border-gray-300"
                  >
                    <option value="" disabled>
                      Select Learning Language
                    </option>
                    {Object.entries(LANGUAGE_TO_FLAG).map(([lang, code]) => (
                      <option
                        key={`learn-lan-${lang}`}
                        value={lang.toLowerCase()}
                      >
                        {" "}
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Location */}
              <label className="text-xs font-semibold mt-2 mb-1 ml-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="city,country"
                className="px-4 py-2 rounded-3xl outline-none border border-gray-300"
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="text-base flex items-center justify-center font-semibold text-black bg-green-600 hover:bg-green-700 hover:scale-95 transition-all duration-200 px-4 py-2 rounded-3xl w-full"
            >
              {isPending ? (
                <Loader className="animate-spin" />
              ) : (
                <span className="flex items-center justify-center">
                  <Globe className="w-4 h-4 mr-1" />
                  Complete Onboarding
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnBoard;
