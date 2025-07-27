import React from "react";
import { useState } from "react";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { Link, Navigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { Loader } from "lucide-react";
import { signup } from "../../lib/auth.api";
import { CircleAlert } from 'lucide-react';

const Register = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checked, setChecked] = useState(false);

  //usemutation
  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      setSignupData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
      });
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupData);
    // if (signupData.confirmPassword !== signupData.password) {
    //   alert("Confirm Password not matched");
    //   return;
    // }
    mutate(signupData);
  };
  const handleEye = () => {
    setShowPassword(!showPassword);
  };
  const handleConfirmEye = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <div
      className="flex items-center justify-center p-4 sm:p-6 md:p-8"
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
          <div className="w-full ">
            <h2 className="text-xl md:text-2xl font-bold text-gray-400 tracking-tight">
              Create An Account
            </h2>
            <p className="text-xs md:text-sm text-gray-500">
              Join nexaStream and start your language learning journey
            </p>
          </div>
          {/*----------- form----------------- */}
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div className="space-y-3">
                <div className="form-control w-full">
                  <label className="label">Full Name</label>
                  <input
                    type="text"
                    className="border outline-none py-2 px-4 rounded-3xl"
                    placeholder="Enter Your Full Name"
                    value={signupData.fullName}
                    onChange={(e) => {
                      setSignupData({
                        ...signupData,
                        fullName: e.target.value,
                      });
                    }}
                    required
                  />
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="border outline-none py-2 px-4 rounded-3xl"
                    placeholder="Enter Your Email"
                    value={signupData.email}
                    onChange={(e) => {
                      setSignupData({ ...signupData, email: e.target.value });
                    }}
                    required
                  />
                  <div className="h-2 mb-1">
                    {error && (
                      <span className="text-red-500 text-xs flex gap-2 items-center ">
                        <CircleAlert/>
                        {error.response.data.message}
                      </span>
                    )}
                  </div>
                  <label className="label">Password</label>
                  <div className="rounded-3xl w-full border flex items-center bg-transparent bg-[#3b3b3b]">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="border-none outline-none py-2 px-4 w-full rounded-3xl"
                      placeholder="Enter Your Password"
                      value={signupData.password}
                      onChange={(e) => {
                        setSignupData({
                          ...signupData,
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
                    {error &&
                      error.response?.data?.errors?.find(
                        (err) => err.field === "password"
                      ) && (
                        <span className="text-red-500 text-xs ">
                          {console.log(error)}
                            {
                              error.response.data.errors.find(
                                (err) => err.field === "password"
                              ).message
                            }
                        </span>
                      )}
                  </div>
                  <label className="label">Confirm Password</label>
                  <div className="rounded-3xl w-full border flex items-center bg-transparent bg-[#3b3b3b]">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="border-none outline-none py-2 px-4 w-full rounded-3xl"
                      placeholder="Confirm Your Password"
                      value={signupData.confirmPassword}
                      onChange={(e) => {
                        setSignupData({
                          ...signupData,
                          confirmPassword: e.target.value,
                        });
                      }}
                      required
                    />
                    <div className="mr-2 mt-1">
                      {showConfirmPassword ? (
                        <button type="button">
                          <Eye onClick={handleConfirmEye} className="w-5 h-5" />
                        </button>
                      ) : (
                        <button type="button">
                          <EyeOff
                            onClick={handleConfirmEye}
                            className="w-5 h-5"
                          />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="h-2 mb-1">
                    <div className="h-2 mb-1">
                      {console.log(error)}
                      {error &&
                        error.response?.data?.errors?.find(
                          (err) => err.field === "confirmPassword"
                        ) && (
                          <span className="text-red-500 text-xs ">
                            {console.log(error)}
                            {
                              error.response.data.errors.find(
                                (err) => err.field === "confirmPassword"
                              ).message
                            }
                          </span>
                        )}
                    </div>
                  </div>
                  <label className="label">Select gender</label>
                  <select
                    className="border outline-none py-2 px-4 rounded-3xl"
                    value={signupData.gender}
                    onChange={(e) => {
                      setSignupData({
                        ...signupData,
                        gender: e.target.value,
                      });
                    }}
                    required
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2 my-2">
                <input
                  type="checkbox"
                  value={checked}
                  onChange={() => {
                    setChecked(!checked);
                  }}
                />
                <p className="text-xs md:text-sm">
                  I agree to the{" "}
                  <span className="text-emerald-400 cursor-pointer">
                    term of service
                  </span>{" "}
                  and{" "}
                  <span className="text-emerald-400 cursor-pointer">
                    privacy policy
                  </span>
                  .
                </p>
              </div>
              <div className="w-full">
                <button
                  type="submit"
                  className={`w-full rounded-3xl flex items-center justify-center px-4 py-2 text-black font-semibold transition-all duration-200 ${
                    !checked
                      ? "cursor-not-allowed bg-gray-300 "
                      : "bg-green-600 hover:scale-95 hover:bg-green-400 "
                  }`}
                >
                  {isPending ? (
                    <Loader className="w-5 h-5 animate-spin " />
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>
              <span
                className={`flex items-center justify-center text-xs md:text-sm my-2`}
              >
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="text-emerald-500 cursor-pointer ml-1"
                >
                  {" "}
                  SignIn
                </Link>
              </span>
            </form>
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

export default Register;
