import { StreamChat } from "stream-chat";
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.STREAM_API_KEY;
const secretKey = process.env.STREAM_API_SECRET;

console.log(apiKey)
if (!apiKey || !secretKey) {
  console.error("Keys are missing.");
}
const streamClient = StreamChat.getInstance(apiKey, secretKey);
//helper function
export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUser(userData);
    console.log(userData)
    return userData;
  } catch (error) {
    console.log("Error while upsert Stream User.", error);
  }
};
//TODO : later
export const generateStreamToken = ()=>{}