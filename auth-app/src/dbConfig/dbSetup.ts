import mongoose from "mongoose";

//because nextjs not estabished mongoose connection all time when need it connect that thime only
export default async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const db = mongoose.connection;
    db.on("error", (error) => {
      console.error(error);
      process.exit();
    });
    db.on("open", () => console.log("Connected to MongoDB"));
  } catch (error) {
    console.error("Failed to connect", error);
  }
}
