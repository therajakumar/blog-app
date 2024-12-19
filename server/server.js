// Import required modules

import express from "express";

import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./lib/db.js";
import authRouter from "./routes/auth.route.js";
import blogRouter from "./routes/blog.route.js";
import commentRouter from "./routes/comment.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  return res
    .status(200)
    .send("<h1/>Welcome to blog backend made by Shubham Priya</h1>");
});

app.use("/auth", authRouter);
app.use("/blog", blogRouter);
app.use("/comment", commentRouter);

const PORT = process.env.PORT || 8080;

(async () => {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB", error);
    });
})();
