import express from "express"
import { login, logout, myProfile, signup, userOnboard } from "../controllers/auth.controllers.js"
import { loginValidator, signupValidator } from "../validation/user.validation.js"
import { protectedRoute } from "../middleware/auth.middleware.js"
const router = express.Router()
router.post("/signup",signupValidator,signup)
router.post("/login",loginValidator,login)
router.post("/logout",logout)
router.post("/onboarding",protectedRoute,userOnboard)
router.get("/me",protectedRoute,myProfile)
export default router