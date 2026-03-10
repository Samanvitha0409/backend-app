import express from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import auth from "./middleware/authweb.js";
import mongoose from "mongoose";
import dbConnect from "./config/db.js";
import productRouter from "./routes/productRoute.js";
import storeRouter from "./routes/storeRoute.js";
import indexRouter from "./routes/indexRoute.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
const app = express();
app.use(cors());
dotenv.config();
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "views");
app.set("layout", "layout");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use("/store", storeRouter);

app.use((req, res, next) => {
  res.locals.user = req.session.user
  next();
});

app.use("/auth", authRouter);
app.use("/", indexRouter);

app.use("/products", auth, productRouter);
app.use("/users", auth, userRouter);

const startServer = async () => {
  await dbConnect();
  app.listen(5000, () => {
    console.log("Server Started");
  });
};

startServer();
