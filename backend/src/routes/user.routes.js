import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import {
  acceptRequest,
  getById,
  getFriends,
  getOutgoingRequest,
  getRecomendedUsers,
  sendFriendRequest,
  showConnections,
} from "../controllers/user.controllers.js";
const router = express.Router();
router.use(protectedRoute);
router.get("/recomended", getRecomendedUsers);
router.get("/profile/:id",getById)
router.get("/myfriends", getFriends);
router.post("/sendfriendreq/:id",sendFriendRequest)
router.put("/acceptrequest/:id",acceptRequest)
router.get("/showconnections",showConnections)
router.get("/showoutgoing",getOutgoingRequest)
export default router;
