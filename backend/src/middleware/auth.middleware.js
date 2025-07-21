import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "The token has expired." });
    }
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid Token." });
    }
    const user = await User.findById(decodedToken._id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Forbidden Token" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Error in auth : ${error}` });
  }
};
