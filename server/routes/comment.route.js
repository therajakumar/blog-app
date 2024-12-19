import { Router } from "express";
import {
  addComment,
  deleteComment,
} from "../controllers/comment.controller.js";

const commentRouter = Router();

commentRouter.route("/addComment").post(addComment);
commentRouter.route("/delete").delete(deleteComment);


export default commentRouter;
