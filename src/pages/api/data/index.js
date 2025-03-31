import connectDB from "../../../../utils/connectDb";

export default async function handler(req, res) { 
  await connectDB();
  if (req.method === "POST") {
    const { name } = req.body;

    if (!name || name.length <= 3) {
      res.status(422).json({ status: "failed", message: "Invalid Data" });
      return;
    }
    res.status(201).json({
      status: "success",
      message: "Data Created",
      data: { name },
    });
  }
}
