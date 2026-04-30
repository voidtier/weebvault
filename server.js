const app = require("./backend/app.js");
const connectToDB = require("./backend/config/db.js");
const dotenv = require("dotenv");
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
