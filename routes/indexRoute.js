import homePage from "../controllers/indexController.js";
import express from "express"

const indexRouter = express.Router()

indexRouter.get("/",homePage)

export default indexRouter