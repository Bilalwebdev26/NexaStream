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
import Loader from "./components/common/Loader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/common/Layout.jsx";
const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = Boolean(authUser?.isOnBoarded);
  if (isLoading) return <Loader />;
  return (
    <div className="h-screen" data-theme="forest">
      <Routes>
        <Route>
          <Route
            index
            path="/"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showsidebar={true}>
                  <Home />
                </Layout>
              ) : (
                <Navigate to={isAuthenticated ? "/onboard" : "/login"} />
              )
            }
          />
          <Route
            path="/login"
            element={!isAuthenticated ? <SignIn /> : <Navigate to={"/"} />}
          />
          <Route
            path="/signup"
            element={!isAuthenticated ? <Register /> : <Navigate to={"/"} />}
          />
          <Route
            path="/onboard"
            element={
              isAuthenticated ? (
                !isOnboarded ? (
                  <OnBoard />
                ) : (
                  <Navigate to={"/"} />
                )
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/notification"
            element={
              isAuthenticated ? (
                <Layout>
                  <Notification />
                </Layout>
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/chat"
            element={
              isAuthenticated ? <ChatPage /> : <Navigate to={"/login"} />
            }
          />
          <Route
            path="/call"
            element={
              isAuthenticated ? <CallPage /> : <Navigate to={"/login"} />
            }
          />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
