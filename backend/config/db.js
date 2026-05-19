import mongoose from "mongoose";

async function connectToDB() {
  const isDBConnected = await mongoose.connect(process.env.mongodbURL);
  console.log("DB is Connected");
}

export default connectToDB;
