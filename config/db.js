// import mongoose from "mongoose";
// const dbConnect = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//   } catch (err) {
//     console.log(err);
//   }
// };
// export default dbConnect;
import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected ✅");
    console.log("Host:", conn.connection.host);
    console.log("Database:", conn.connection.name);

  } catch (err) {
    console.log("DB Error:", err);
  }
};

export default dbConnect;
