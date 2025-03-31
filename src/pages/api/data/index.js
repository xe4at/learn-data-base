// import mongoose from "mongoose";

// export default function handler(req, res) {
//   if (req.method === "POST") {
//     const { name } = req.body;

//     if (!name || name.length <= 3) {
//       res.status(422).json({ status: "failed", message: "Invalid Data" });
//       return;
//     }

//     // connect to DB
//     mongoose.connect(
//       "mongodb+srv://xe4at:<U5zNANxLWCq0Hwiv >@cluster0.9jgrpzn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
//       () => console.log("Connected to dB")
//     );

//     res.status(201).json({
//       status: "success",
//       message: "Data Created",
//       data: { name },
//     });
//   }
// }
import mongoose from "mongoose";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name } = req.body;

    if (!name || name.length <= 3) {
      res.status(422).json({
        status: "failed",
        message: "Name must be longer than 3 characters",
      });
      return;
    }

    try {
      // Use connection string from your .env file
      const dbURI = process.env.MONGO_URI;
      await mongoose.connect(dbURI); // Options removed as they are now redundant
      console.log("Connected to DB");

      res.status(201).json({
        status: "success",
        message: "Data Created",
        data: { name },
      });
    } catch (error) {
      console.error("DB Connection Error:", error);
      res
        .status(500)
        .json({ status: "failed", message: "Internal Server Error" });
    } finally {
      // Close the database connection if required
      await mongoose.connection.close();
    }
  } else {
    res.status(405).json({ status: "failed", message: "Method Not Allowed" });
  }
}
