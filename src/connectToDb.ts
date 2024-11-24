import mongoose from "mongoose";
import "dotenv/config";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log("Can not connect to mongodb cluster.");
  }
};

export default connectToDB;
