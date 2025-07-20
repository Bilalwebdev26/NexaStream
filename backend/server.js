import app from "./src/app.js";
import { connectDB } from "./src/config/db.connection.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server Start", PORT);
    });
  })
  .catch((err) => {
    console.log("Server Failed. ", err);
    process.exit(1);
  });
