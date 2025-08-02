import { validationResult } from "express-validator";
import { User } from "../model/user.model.js";
import { upsertStreamUser } from "../config/stream.chat.js";

export const signup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
     console.log(errors.array()); // <-- Add this
    // Agar validation fail hua
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  const { fullName, email, password, confirmPassword, gender } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Confirm password not matched." });
  }
  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exist with this email." });
    }
    //ager user nahi exist kerta to new create ker do
    //pehle avatar get ker lo
    let avatarImage = "";
    if (gender === "male") {
      const idx = Math.floor(Math.random() * 50 + 1); //1-50 tak koi bi number dedega for male
      avatarImage = `https://avatar.iran.liara.run/public/${idx}.png`;
    }
    if (gender === "female") {
      const idx = Math.floor((Math.random() * 0.5 + 0.5) * 100 + 1); //51-100 tak koi bi number dedega for female
      avatarImage = `https://avatar.iran.liara.run/public/${idx}.png`;
    }
    if (gender === "Prefer not to say") {
      const idx = Math.floor(Math.random() * 100 + 1); //1-100 tak koi bi number dedega for male
      avatarImage = `https://avatar.iran.liara.run/public/${idx}.png`;
    }
    existingUser = await User.create({
      fullName,
      email,
      password,
      profilePic: avatarImage,
      gender,
    });
    //--------TODO--------create the user in stream as well
    try {
      await upsertStreamUser({
        id: existingUser._id?.toString(),
        name: existingUser.fullName,
        image: existingUser.profilePic || "",
      });
    } catch (error) {
      console.log("Error while creating stream user");
    }
    //set token
    const token = existingUser.token();
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 Dyas
      httpOnly: true, //prevent XSS attacks
      sameSite: "strict", //Prevent CSRF Attacks
      secure: process.env.NODE_ENV === "production",
    });
    const user = await User.findById(existingUser._id).select("-password");
    return res.status(201).json({
      message: `Hey ${fullName} Your Account Created SuccessFully`,
      user,
    });
  } catch (error) {
    console.log(`Error while signup :${error.message}`);
    return res
      .status(500)
      .json({ message: `Error while signup :${error.message}` });
  }
};
export const login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Agar validation fail hua
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  try {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(400).json({ message: "User does't Exist" });
    }
    const checkPass = await checkUser.comparePassword(password);
    if (!checkPass) {
      return res.status(401).json({ message: "Incorrect email address or password." });
    }
    //token set
    const token = checkUser.token();
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 Dyas
      httpOnly: true, //prevent XSS attacks
      sameSite: "strict", //Prevent CSRF Attacks
      secure: process.env.NODE_ENV === "production",
    });
    const user = await User.findById(checkUser._id).select("-password");
    return res.status(200).json({ message: "Login SuccessFull", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to login." });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "Logout SuccessFully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to Logout." });
  }
};
export const userOnboard = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      { ...req.body, isOnBoarded: true },
      { new: true }
    ); //169ms
    // const user = await User.findById(req.user._id)//288ms
    if (!user) {
      return res.status(400).json({ message: "User not Found." });
    }
    // user.fullName=fullName||user.fullName
    // user.bio=bio
    // user.nativeLanguage=nativeLanguage
    // user.learningLanguage=learningLanguage
    // user.location=location
    // await user.save()
    try {
      await upsertStreamUser({
        id: user._id.toString(),
        name: user.fullName,
        image: user.profilePic || "",
      });
    } catch (error) {
      console.log(error);
    }
    return res
      .status(200)
      .json({ message: `${user.fullName} you Onboarded Successfully.`, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to onboard." });
  }
};
export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }
    return res
      .status(200)
      .json({ message: `${user.fullName} viewed Your Profile.`, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while showing My Profile." });
  }
};
export const getme = async(req,res)=>{
  return res.status(200).json({message:"hello"})
}