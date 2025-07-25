import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import Home from "./components/pages/Home";
import OnBoard from "./components/pages/OnBoard";
import SignIn from "./components/pages/SignIn";
import Register from "./components/pages/Register";
import Notification from "./components/pages/Notification";
import ChatPage from "./components/pages/ChatPage";
import CallPage from "./components/pages/CallPage";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios.js";
const App = () => {
  const {
    data: authData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      console.log(res.data);
      return res.data;
    },
    retry: false,
  });
  // console.log(data)
  const authUser = authData?.user; //user waha se arha ha jaha hamne controller bnaya or jo return ker rahe ha
  console.log("Auth User : ",authUser )
  return (
    <div className="h-screen" data-theme="coffee">
      <Routes>
        <Route>
          <Route
            index
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={!authUser ? <SignIn /> : <Navigate to={"/"} />}
          />
          <Route
            path="/signup"
            element={!authUser ? <Register /> : <Navigate to={"/"} />}
          />
          <Route path="/onboard" element={<OnBoard />} />
          <Route
            path="/notification"
            element={authUser ? <Notification /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/chat"
            element={authUser ? <ChatPage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/call"
            element={authUser ? <CallPage /> : <Navigate to={"/login"} />}
          />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
