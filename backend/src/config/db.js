import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";
console.log(process.env.DB_PASSWORD)
export const connectDb = async () => {
  try {
    await mongoose.connect("mongodb+srv://dbUser:hTSdYC6JHUapmAkA@cluster1.cbenokn.mongodb.net/?appName=Cluster1");
    console.log("MONGODB Connected Successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};
