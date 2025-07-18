import { validationResult } from "express-validator";
import { User } from "../model/user.model.js";

export const signup = async (req, res) => {
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
  const { fullName, email, password, confirmPassword } = req.body;
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
    const idx = Math.floor(Math.random() * 100 + 1); //1-100 tak koi bi number dedega
    const avatarImage = `https://avatar.iran.liara.run/public/${idx}.png`;
    existingUser = await User.create({
      fullName,
      email,
      password,
      profilePic: avatarImage,
    });
    //--------TODO--------create the user in stream as well
    //set token
    const token = existingUser.token();
    console.log(token);
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 Dyas
      httpOnly: true, //prevent XSS attacks
      sameSite: "strict", //Prevent CSRF Attacks
      secure: process.env.NODE_ENV === "production",
    });
    const user = await User.findById(existingUser._id).select("-password -jwt");
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
  try {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(400).json({ message: "User does't Exist" });
    }
    const checkPass = await existingUser.comparePassword(password);
    if (!checkPass) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    //token set
    const token = checkUser.token();
    console.log(token);
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 Dyas
      httpOnly: true, //prevent XSS attacks
      sameSite: "strict", //Prevent CSRF Attacks
      secure: process.env.NODE_ENV === "production",
    });
    const user = await User.findById(checkUser._id).select("-password -jwt");
    return res.status(200).json({ message: "Login SuccessFull", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to login." });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt")
    return res.status(200).json({message:"Logout SuccessFully"})
  } catch (error) {
    return res.status(500).json({ message: "Failed to Logout." });
  }
};
