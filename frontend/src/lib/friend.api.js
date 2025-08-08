import { axiosInstance } from "./axios";

export const showFriends = async () => {
  console.log("friends Data : ");
  const res = await axiosInstance.get("/users/myfriends");
  console.log("friends Data after : ", res.data);
  return res.data.user;
};
export const showRecommendation = async () => {
  const res = await axiosInstance.get("/users/recomended");
  return res.data.users || [];
};
export const showOutgoingRequest = async () => {
  const res = await axiosInstance.get("/users/showoutgoing");
  return res.data.outgoingReq || [];
};
export const sendFriendRequest = async (id) => {
  try {
    console.log("Send Friend Req Call");
    const res = await axiosInstance.post(`/users/sendfriendreq/${id}`);
    return res.data;
  } catch (error) {
    console.log("Error in Send Req : ", error);
    return null;
  }
};
export const getUserById = async (id) => {
  try {
    const res = await axiosInstance.get(`/users/profile/${id}`);
    console.log("Profile Data after : ", res.data);
    return res.data.user;
  } catch (error) {
    console.log("Error in Get user Req : ", error);
    return null;
  }
};
export const cancelFriendReq = async (id) => {
  const res = await axiosInstance.delete(`/users/deletereq/${id}`);
  return res.data;
};
export const unfollow = async (id) => {
  try {
    const res = await axiosInstance.post(`/users/unfollow/${id}`);
    return res.data;
  } catch (error) {
    console.log("Error in Get user Req : ", error);
    return null;
  }
};
export const showInComConReq = async () => {
  try {
    const res = await axiosInstance.get("/users/showconnections");
    console.log("Profile Data Incomming : ", res.data);
    return res.data;
  } catch (error) {
    console.log("Error in Get user Incomming Req : ", error);
    return null;
  }
};
export const acceptReq = async (id) => {
  try {
    const res = await axiosInstance.put(`/users/acceptrequest/${id}`);
    console.log("Profile Data Accept : ", res.data);
    return res.data;
  } catch (error) {
    console.log("Error in Accept user Incomming Req : ", error);
    return null;
  }
};
export const rejectReq = async (id) => {
  try {
    const res = await axiosInstance.delete(`/users/reject/${id}`);
    console.log("Profile Data Reject : ", res.data);
    return res.data;
  } catch (error) {
    console.log("Error in Accept user Incomming Req : ", error);
    return null;
  }
};
