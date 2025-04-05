import User from "../../../../models/User";
import connectDB from "../../../../utils/connectDb";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      status: "failed",
      message: "Method Not Allowed",
      allowedMethods: ["POST"],
    });
  }

  try {
    await connectDB();

    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim().length <= 3) {
      return res.status(422).json({
        status: "failed",
        message:
          "Name is required and must be a string longer than 3 characters",
      });
    }

    const user = await User.create({ name: name.trim() });

    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    console.error("API Error:", err);

    if (err.name === "ValidationError") {
      return res.status(422).json({
        status: "error",
        message: err.message,
      });
    }

    if (err.message.includes("Database connection failed")) {
      return res.status(503).json({
        status: "error",
        message: "Service unavailable - Database error",
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}
