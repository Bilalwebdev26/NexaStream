import React from "react";
import { useState } from "react";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { Link, Navigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { Loader } from "lucide-react";
import { signin, signup } from "../../lib/auth.api";
import { CircleAlert } from "lucide-react";

const SignIn = () => {
  const [signinData, setsigninData] = useState({
    email: "",
    password: "",
  });
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);

  //usemutation
  const { mutate, isPending, error } = useMutation({
    mutationFn: signin,
    onSuccess: () => {
      setsigninData({
        email: "",
        password: "",
      });
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signinData);
    mutate(signinData);
  };
  const handleEye = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* form part left part */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/*----------- nexastream - logo----------------- */}
          <div className="mb-4 flex items-center justify-start">
            <img src="bg.png" alt="logo" className="w-12 h-12" />
            <span className="mb-1 text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from bg-green-500 to-primary tracking-wider">
              nexaStream
            </span>
          </div>
          {/* Error */}
          {/*----------- heading----------------- */}
          <div className="mt-10">
            <div className="w-full ">
              <h2 className="text-xl md:text-2xl font-bold text-gray-400 tracking-tight">
                Welcome Back
              </h2>
              <p className="text-xs md:text-sm text-gray-500">
                Login nexaStream and start's language learning journey
              </p>
            </div>
            {/*----------- form----------------- */}
            <div className="w-full">
              <form onSubmit={handleSubmit}>
                <div className="space-y-3">
                  <div className="form-control w-full">
                    <label className="label">Email</label>
                    <input
                      type="email"
                      className="border outline-none py-2 px-4 rounded-3xl"
                      placeholder="Enter Your Email"
                      value={signinData.email}
                      onChange={(e) => {
                        setsigninData({ ...signinData, email: e.target.value });
                      }}
                      required
                    />
                    <div className="h-2 mb-1"></div>
                    <label className="label">Password</label>
                    <div className="rounded-3xl w-full border flex items-center bg-transparent bg-[#3b3b3b]">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="border-none outline-none py-2 px-4 w-full rounded-3xl"
                        placeholder="Enter Your Password"
                        value={signinData.password}
                        onChange={(e) => {
                          setsigninData({
                            ...signinData,
                            password: e.target.value,
                          });
                        }}
                        required
                      />
                      <div className="mr-2 mt-1">
                        {showPassword ? (
                          <button type="button">
                            <Eye onClick={handleEye} className="w-5 h-5" />
                          </button>
                        ) : (
                          <button type="button">
                            <EyeOff onClick={handleEye} className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="h-2 mb-1">
                      {error && (
                        <span className="text-red-500 text-xs flex gap-2 items-center my-2">
                          <CircleAlert className="w-4 h-4" />
                          {console.log("Error From SignIn : ",error)}
                          {error.response?.data?.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="">
                  <p className="text-sm flex items-center my-1">
                    Forgot Password?{" "}
                    <span className="text-red-500 font-semibold cursor-pointer ml-1">
                      reset
                    </span>
                  </p>
                </div>
                <div className="w-full">
                  <button
                    type="submit"
                    className={`w-full rounded-3xl flex items-center justify-center px-4 py-2 text-black font-semibold transition-all duration-200 ${
                      !(signinData.email && signinData.password)
                        ? "cursor-not-allowed bg-gray-300 "
                        : "bg-green-600 hover:scale-95 hover:bg-green-400 "
                    }`}
                  >
                    {isPending ? (
                      <Loader className="w-5 h-5 animate-spin " />
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
                <span
                  className={`flex items-center justify-center text-xs md:text-sm my-2`}
                >
                  Don't have an account?{" "}
                  <Link
                    to={"/signup"}
                    className="text-emerald-500 cursor-pointer ml-1"
                  >
                    {" "}
                    Create one
                  </Link>
                </span>
              </form>
            </div>
          </div>
        </div>
        {/* Right section Start---------------------------------------------- */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/videocall.png"
                alt="videocall"
                className="w-full h-full"
              />
            </div>
            <div className="text-center space-y-3 mt-6">
              <h2 className="font-bold text-2xl text-gray-300 opacity-90">
                Connect with Language Partner worldwide
              </h2>
              <p className="opacity-70 text-xs md:text-sm ">
                Practice conversation,make friends and imporve your language
                skills together
              </p>
            </div>
          </div>
        </div>
        {/* Right section End---------------------------------------------- */}
      </div>
    </div>
  );
};

export default SignIn;
