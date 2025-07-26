import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connected Successfully:", res.connection.host);
  } catch (error) {
    console.error("Error :: DB Connection faild:", error.message);
    process.exit(1);
  }
};

export default connectDatabase;
