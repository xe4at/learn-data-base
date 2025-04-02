import connectDB from "../../../../utils/connectDb";

export default async function handler(req, res) {
  try {
    await connectDB();

    if (req.method === "POST") {
      const { name } = req.body;

      if (!name || name.trim().length <= 3) {
        return res
          .status(422)
          .json({
            status: "failed",
            message: "Name must be longer than 3 characters",
          });
      }

      return res.status(201).json({
        status: "success",
        message: "Data Created",
        data: { name },
      });
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (err) {
    console.error("API Error:", err);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
}

// import connectDB from "../../../../utils/connectDb";

// export default async function handler(req, res) {
//   await connectDB();

//   if (req.method === "POST") {
//     const { name } = req.body;

//     if (!name || name.length <= 3) {
//       res.status(422).json({ status: "failed", message: "Invalid Data" });
//       return;
//     }
//     res.status(201).json({
//       status: "success",
//       message: "Data Created",
//       data: { name },
//     });
//   }
// }
