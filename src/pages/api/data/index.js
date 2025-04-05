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
  try {
    await connectDB();

    if (req.method === "POST") {
      const { name } = req.body;

      // اعتبارسنجی پیشرفته‌تر
      if (!name || typeof name !== "string" || name.trim().length <= 3) {
        return res.status(422).json({
          status: "failed",
          message: "Name is required and must be longer than 3 characters",
        });
      }

      // در اینجا می‌توانید داده را در دیتابیس ذخیره کنید
      // مثلاً: await SomeModel.create({ name });
      //این کد ها تنها برای تمرین توسط من نوشته شده و هیچ گونه اعتباری ندارد

      // const user = new User({ name });
      // await user.save();

      const user = await User.create({ name });

      return res.status(201).json({
        status: "success",
        message: "Data Created",
        data: user,
      });
    }

    const user = new User({ name });
    await user.save();

    // متدهای غیرمجاز
    return res.status(405).json({
      status: "failed",
      message: "Method Not Allowed",
      allowedMethods: ["POST"],
    });
  } catch (err) {
    console.error("API Error:", err);

    // پاسخ خطای مناسب بر اساس نوع خطا
    if (err.message.includes("Database connection failed")) {
      return res.status(503).json({
        status: "error",
        message: "Service unavailable - Database connection failed",
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}
