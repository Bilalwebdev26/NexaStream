import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const res = await axiosInstance.post("/auth/signup", signupData);
  return res.data;
};
export const myProfile = async () => {
  const res = await axiosInstance.get("/auth/me");
  console.log(res.data);
  return res.data;
};
