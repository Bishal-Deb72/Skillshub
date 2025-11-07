import express from "express";
import { getAllCOurses, getCourseId } from "../controllers/courseControllers.js";

const courseRouter = express.Router()

courseRouter.geta('/all', getAllCOurses)
courseRouter.get('/:id', getCourseId)

export default courseRouter;