import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const res = await axiosInstance.post("/auth/signup", signupData);
  return res.data;
};
export const myProfile = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error : ", error);
    return null;
  }
};
export const onboardUser = async (formData) => {
  const res = await axiosInstance.put("/auth/onboarding", formData);
  console.log("Res onboard : ", res);
  return res.data;
};
export const signin = async (formData) => {
  const res = await axiosInstance.post("/auth/login", formData);
  return res.data;
};
export const logout = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};
