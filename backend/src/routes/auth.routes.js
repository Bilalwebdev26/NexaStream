import express from "express"
import { login, logout, signup } from "../controllers/auth.controllers.js"
import { loginValidator, signupValidator } from "../validation/user.validation.js"
const router = express.Router()
router.post("/signup",signupValidator,signup)
router.post("/login",loginValidator,login)
router.get("/logout",logout)
export default router