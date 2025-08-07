import mongoose from "mongoose";
import dotenv from "dotenv";
import { FriendRequest } from "./src/model/friendReq.model.js";
dotenv.config()
//connect to mongodb
await mongoose.connect(`${process.env.MONGODB_URI}/nexastream`)
//fucntion seed data
const seedData = async()=>{
    try {
        await FriendRequest.deleteMany()
      
        
        process.exit()
    } catch (error) {
        console.log("Error sending data",error)
        process.exit(1)
    }
}
seedData()