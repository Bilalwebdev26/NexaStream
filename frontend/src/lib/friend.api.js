import { axiosInstance } from "./axios";

export const showFriends = async () => {
  console.log("friends Data : ")
  const res = await axiosInstance.get("/users/myfriends");
  console.log("friends Data after : ",res.data)
  return res.data.user;
};
export const showRecommendation = async () => {
  const res = await axiosInstance.get("/users/recomended");
  return res.data;
};
export const showOutgoingRequest = async () => {
  const res = await axiosInstance.get("/users/showoutgoing");
  return res.data;
};
export const sendFriendRequest = async (id) => {
  try {
    const res = await axiosInstance.get(`/users/sendfriendreq/${id}`);
    return res.data;
  } catch (error) {
    console.log("Error in Send Req : ",error)
    return null
  }
};
