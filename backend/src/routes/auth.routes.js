import express from "express"
import { login, signup } from "../controllers/auth.controllers.js"
import { signupValidator } from "../validation/user.validation.js"
const router = express.Router()
router.post("/signup",signupValidator,signup)
router.post("/login",login)
export default router