import React from "react";
import { useState } from "react";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 fles flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
       {/* form part left part */}
         <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
           {/* nexastream logo */}
           <h1 className="text-white">bilal</h1>
           <img src="logo.png" alt="" />
         </div>
       {/*  */}
       <div className=""></div>
      </div>
    </div>
  );
};

export default Signup;
