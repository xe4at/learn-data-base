import mongoose from "mongoose";

let cachedConnection = null;

async function connectDB() {
  if (cachedConnection) {
    console.log("Using existing MongoDB connection");
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, 
    });

    console.log("Connected to MongoDB successfully");
    cachedConnection = connection;
    return connection;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    // throw new Error("Database connection failed");
  }
}

export default connectDB;
