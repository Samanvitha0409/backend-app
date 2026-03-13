// import express from "express";
// import expressLayouts from "express-ejs-layouts";
// import session from "express-session";
// import cors from "cors";
// import dotenv from "dotenv";

// import { authenticateAdmin } from "./middleware/auth.js";
// import dbConnect from "./config/db.js";

// import productRouter from "./routes/productRoute.js";
// import storeRouter from "./routes/storeRoute.js";
// import homeRouter from "./routes/homeRoute.js";
// import authRouter from "./routes/authRoute.js";
// import userRouter from "./routes/userRoute.js";

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(expressLayouts);
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static("public"));

// // View Engine
// app.set("view engine", "ejs");
// app.set("views", "views");
// app.set("layout", "layout");

// // Session
// app.use(
//   session({
//     secret: "secretkey",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// // Make user available in views
// app.use((req, res, next) => {
//   res.locals.user = req.session.user;
//   next();
// });

// // Routes
// app.use("/auth", authRouter);
// app.use("/store", storeRouter);
// app.use("/", authenticateAdmin, homeRouter);
// app.use("/products", authenticateAdmin, productRouter);
// app.use("/users", authenticateAdmin, userRouter);

// // Start Server
// const startServer = async () => {
//   try {
//     await dbConnect(); // connect to MongoDB
//     console.log("Database Connected");

//     const PORT = process.env.PORT || 5000;

//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });

//   } catch (error) {
//     console.error("Server start error:", error);
//   }
// };

// startServer();
import express from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";

import { authenticateAdmin } from "./middleware/auth.js";
import dbConnect from "./config/db.js";

import productRouter from "./routes/productRoute.js";
import storeRouter from "./routes/storeRoute.js";
import homeRouter from "./routes/homeRoute.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();

const app = express();

/* -------------------- Middleware -------------------- */

app.use(cors());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

/* -------------------- View Engine -------------------- */

app.set("view engine", "ejs");
app.set("views", "views");
app.set("layout", "layout");

/* -------------------- Trust Proxy (needed for Render) -------------------- */

app.set("trust proxy", 1);

/* -------------------- Session -------------------- */

app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

/* -------------------- Make user available in views -------------------- */

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

/* -------------------- Routes -------------------- */

app.use("/auth", authRouter);
app.use("/store", storeRouter);
app.use("/", authenticateAdmin, homeRouter);
app.use("/products", authenticateAdmin, productRouter);
app.use("/users", authenticateAdmin, userRouter);

/* -------------------- Start Server -------------------- */

const startServer = async () => {
  try {
    await dbConnect();
    console.log("Database Connected ✅");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server start error:", error);
  }
};

startServer();