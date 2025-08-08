import mongoose from "mongoose";
import { User } from "../model/user.model.js";
import { FriendRequest } from "../model/friendReq.model.js";

export const getRecomendedUsers = async (req, res) => {
  try {
    //me na show hu or mere friends bi na show hu
    const recomendedUsers = await User.find({
      $and: [
        { _id: { $ne: req.user._id } }, //me na hu object me
        { _id: { $nin: req.user.friends } },
        { isOnBoarded: true },
      ],
    });
    if (recomendedUsers.length < 1) {
      return res.status(400).json({ message: "Recommend User Not Found." });
    }
    return res
      .status(200)
      .json({ message: "Recomended User Available.", users: recomendedUsers });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error while getting Recomended users." });
  }
};
//TODO : make a user route which get by id
export const getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User Not found" });
    }
    return res.status(200).json({ message: "User Found SuccessFully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while getting user." });
  }
};
export const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage"
      );
    if (user.length === 0) {
      return res.status(400).json({ message: "No Friends Found." });
    }
    return res
      .status(200)
      .json({ message: "Friends Found SuccessFully.", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while getting Friends." });
  }
};
export const sendFriendRequest = async (req, res) => {
  try {
    //login user ->sender
    const currentUser = await User.findById(req.user._id);
    if (!currentUser) {
      return res.status(404).json({ message: "User not Found." });
    }
    //reciver req user 0->reciever
    const recieverUser = await User.findById(req.params.id);
    if (!recieverUser) {
      return res.status(404).json({ message: "Reciever not Found." });
    }
    //apne ap ko request na bejh dena
    if (currentUser._id.toString() === recieverUser._id.toString()) {
      return res
        .status(400)
        .json({ message: "You can't send request yourself." });
    }
    //check already friends to nahi
    // if (recieverUser.friends.includes(currentUser._id)) {
    //   return res
    //     .status(400)
    //     .json({ message: "You are Already Friends." });
    // } ->time compelxity O(n) -> linear check
    const isFriend = await User.exists({
      _id: recieverUser._id,
      friends: currentUser._id,
    });

    if (isFriend) {
      return res.status(400).json({ message: "You are Already Friends." });
    }
    //check already req send to nahi ha ->DB query
    const checkReq = await FriendRequest.findOne({
      // $or: [
      sender: currentUser._id,
      recipient: recieverUser._id,
      // { sender: recieverUser._id, recipient: currentUser._id },
      // ],
    });
    if (checkReq) {
      console.log(checkReq);
      return res.status(400).json({ message: "Already Friends Request Sent." });
    }
    //set ker do request ko ->new request
    const createRequest = await FriendRequest.create({
      sender: currentUser._id,
      recipient: recieverUser._id,
      status: "pending",
    });
    return res
      .status(201)
      .json({ message: "New Friend Request Created.", createRequest });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error while sending Friends Request." });
  }
};
export const acceptRequest = async (req, res) => {
  try {
    //loged In User ko get kero
    const loginUser = await User.findById(req.user._id);
    if (!loginUser) {
      return res.status(400).json({ message: "User not found." });
    }
    //friend req ko bi get kero
    let acceptFriendRequest = await FriendRequest.findById(req.params.id);
    if (!acceptFriendRequest) {
      return res.status(404).json({ message: "Friend Request not Available." });
    }
    //verify kero current/login user reciver ho
    if (acceptFriendRequest.recipient.toString() !== loginUser._id.toString()) {
      return res
        .status(400)
        .json({ message: "You're not Authorized to accept this request." });
    }
    //user ki friend request ko accept
    //user ke frieds list update kerna both sender and reciever
    acceptFriendRequest.status = "accepted";
    await acceptFriendRequest.save();
    //update kero dono sender or reciver ko
    await User.findByIdAndUpdate(acceptFriendRequest.sender, {
      $addToSet: { friends: acceptFriendRequest.recipient },
    });
    await User.findByIdAndUpdate(acceptFriendRequest.recipient, {
      $addToSet: { friends: acceptFriendRequest.sender },
    });
    //Todo----friend req ke object ko delete kerdo
    // if ((acceptFriendRequest.status = "accepted")) {
    //   await FriendRequest.findByIdAndDelete(req.params.id);
    //   console.log("Friend Req Deleted");
    // }
    return res.status(200).json({ message: "Friend Requested Accepted." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error while accepting Friends Request." });
  }
};
export const showConnections = async (req, res) => {
  try {
    const incommingReq = await FriendRequest.find({
      recipient: req.user._id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLanguage learningLanguage"
    );
    const acceptReq = await FriendRequest.find({
      sender: req.user._id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");
    return res
      .status(200)
      .json({ message: "Show Notifications", incommingReq, acceptReq });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while show Notifications." });
  }
};
export const getOutgoingRequest = async (req, res) => {
  try {
    const outgoingReq = await FriendRequest.find({
      sender: req.user._id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profilePic nativeLanguage learningLanguage"
    );
    if (outgoingReq.length === 0) {
      return res.status(200).json({ message: "No Outgoing Request." });
    }
    return res
      .status(200)
      .json({ message: "Show Outgoing Requests.", outgoingReq });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error while show Outgoing Requests." });
  }
};
export const cancelSendRequest = async (req, res) => {
  try {
    console.log("Rec ID : ", req.params.id);
    console.log("Sender ID : ", req.user._id);
    const cancel = await FriendRequest.findOne({
      sender: req.user._id,
      recipient: req.params.id,
      status: "pending",
    });
    if (!cancel) {
      return res.status(404).json({ message: "Req is Not Presented" });
    }
    console.log("Req canceled Successfully", cancel);
    await FriendRequest.findByIdAndDelete(cancel._id);
    return res.status(200).json({ message: "Req Canceled SuccessFully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while show Request." });
  }
};
export const unFollow = async (req, res) => {
  try {
    const check = await FriendRequest.findOne({
      status: "accepted",
      $or: [
        { sender: req.user._id, recipient: req.params.id },
        { sender: req.params.id, recipient: req.user._id },
      ],
    });
    if (!check) {
      return res.status(400).json({ message: "You Are not Friend" });
    }
    await FriendRequest.findByIdAndDelete(check._id);
    // const senderOne = await User.findById(req.user._id);
    // const recieverOne = await User.findById(req.params.id);
    // if (!senderOne) {
    //   return res.status(404).json({ message: "Sender not exist" });
    // }
    // if (!recieverOne) {
    //   return res.status(404).json({ message: "Reciver not exist" });
    // }
    // senderOne.friends = senderOne.friends.filter(
    //   (frnd) => frnd.toString() !== recieverOne._id.toString()
    // );
    // recieverOne.friends = recieverOne.friends.filter(
    //   (frnd) => frnd.toString() !== senderOne._id.toString()
    // );
    // await senderOne.save();
    // await recieverOne.save();
    // Step 2: Remove each other from friends list using $pull
    const sender = await User.findByIdAndUpdate(req.user._id, {
      $pull: { friends: req.params.id },
    });

    const reciver = await User.findByIdAndUpdate(req.params.id, {
      $pull: { friends: req.user._id },
    });
    return res
      .status(200)
      .json({ message: "UnFollow SuccessFully", sender, reciver });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while show Request." });
  }
};
// Todo reject req
//->Object ->Id
//login -> Id && Req User -> Id lelo status===pending
export const rejectReq = async (req, res) => {
  try {
    const deleteReq = await FriendRequest.findByIdAndDelete(req.params.id);
    if (!deleteReq) {
      return res.status(400).json({ message: "Failed to reject request" });
    }
    return res.status(200).json({ message: "Request rejected SuccessFully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while show Request." });
  }
};

export const searchBar = async(req,res)=>{
  const{data}=req.query
  try {
    const search = await User.find({})
  } catch (error) {
    
  }
}