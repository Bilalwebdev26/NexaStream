import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import {
  acceptRequest,
  cancelSendRequest,
  getById,
  getFriends,
  getOutgoingRequest,
  getRecomendedUsers,
  rejectReq,
  sendFriendRequest,
  showConnections,
  unFollow,
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
router.delete("/deletereq/:id",cancelSendRequest)
router.post("/unfollow/:id",unFollow)
router.delete("/reject/:id",rejectReq)
export default router;
