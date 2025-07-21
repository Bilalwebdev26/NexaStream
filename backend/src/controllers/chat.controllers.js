import { generateStreamToken } from "../config/stream.chat.js";

export const getStreamToken = async (req, res) => {
  try {
    const token = generateStreamToken(req.user._id);
    console.log("Token stream : ", token);
    return res.status(200).json({ message: "Stream Token generated." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `Error while generating Token : ${error.message}` });
  }
};
