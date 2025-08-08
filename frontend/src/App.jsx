import React from "react";
import { Navigate, Route, Routes } from "react-router";
import "./App.css";
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
import {usethemeStore} from "./store/themeSelector.js"
import { useSideBarStore } from "./store/globalState.js";
import Friends from "./components/pages/Friends.jsx";
import Profile from "./components/pages/Profile.jsx";
import Requests from "./components/pages/Requests.jsx";
import Search from "./components/pages/Search.jsx";
const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = Boolean(authUser?.isOnBoarded);
  const{theme} = usethemeStore()
  const { showsidebar } = useSideBarStore();
  console.log("showsidebar from app : ",showsidebar)
  if (isLoading) return <Loader />;
  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
        <Route>
          <Route
            index
            path="/"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showsidebar={showsidebar}>
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
            path="/profile/:id"
            element={isAuthenticated ? (
              <Layout showsidebar={showsidebar}>
                <Profile /> 
              </Layout>
            ): <Navigate to={"/"} />}
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
            path="/requests"
            element={
              isAuthenticated ? (
                <Layout showsidebar={showsidebar}>
                  <Requests/>
                </Layout>
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/search"
            element={
              isAuthenticated ? (
                <Layout showsidebar={showsidebar}>
                  <Search/>
                </Layout>
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/notification"
            element={
              isAuthenticated ? (
                <Layout showsidebar={showsidebar}>
                  <Notification />
                </Layout>
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/friends"
            element={
              isAuthenticated ? (
                <Layout showsidebar={showsidebar}>
                  <Friends />
                </Layout>
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/chat/:id"
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
