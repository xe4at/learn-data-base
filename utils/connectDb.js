import mongoose from "mongoose";

async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to DB");
      return;
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    throw err;
  }
}

export default connectDB;

// import mongoose from "mongoose";

// async function connectDB() {
//   try {
//     if (mongoose.connections[0].readyState) return;

//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("Connected to DB");
//   } catch (err) {
//     console.log("Connection failed");
//   }
// }

// export default connectDB;
