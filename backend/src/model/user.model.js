import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    bio: {
      type: String,
      default: "",
      max: 200,
    },
    profilePic: {
      type: String,
      default: "",
    },
    nativeLanguage: {
      type: String,
      default: "",
    },
    learningLanguage: {
      type: String,
      default: "",
    },
    isOnBoarded: {
      type: Boolean,
      default: false,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
//hashing password
userSchema.pre("save", async function (next) {
  // Agar password change nahi hua to hash dobara na karo
  if (!this.isModified("password")) return next();
  try {
    //ager hua to hash ker do with 10 saltrounds
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    console.log("Error while hash : ", error);
    return next(err);
  }
});
//compare password when user login
userSchema.methods.comparePassword = async function (password) {
  try {
   return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.log("Error while compare : ", error);
    throw error;
  }
};
//create Tokens
userSchema.methods.token = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
