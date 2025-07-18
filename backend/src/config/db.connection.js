import mongoose from "mongoose"
export const connectDB = async()=>{
    try {
       const conectDb =  await mongoose.connect(`${process.env.MONGODB_URI}/nexastream`)
       console.log(`MongoDb connection : ${conectDb.connection.host}`)
    } catch (error) {
        console.log(`Error while connecting DB : ${error}`)
        process.exit(1)
    }
}