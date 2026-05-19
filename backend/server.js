import app from "./app.js";
import connectToDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
const activePort = process.env.PORT || "3000";
async function startServer() {
  try {
    await connectToDB();
    app.listen(activePort, () => {
      console.log(`server is running at port : ${activePort}`);
    });
  } catch (error) {
    console.log(`error while connecting to db : ${error}`);
  }
}

startServer();
