import mongoose from "mongoose";
const Database = async () => {
  try {
    await mongoose.connect(`${process.env.mongo}`);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};
// const Database = async () => {
//   await mongoose
//     .connect(process.env.DatabaseURL)
//     .then(() => {
//       console.log("Connected to Mongodb");
//     })
//     .catch((err) => {
//       console.log("Error connecting to Mongodb", err);
//     });
// };
export default Database;
