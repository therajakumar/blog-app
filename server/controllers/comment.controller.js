import mongoose from "mongoose";

import Comment from "../modals/comment.modal.js";
import BlogU from "../modals/blog.modal.js";
import User from "../modals/user.modal.js";

export async function addComment(req, res) {
  try {
    const { authorId, rating, blogId, text } = req.body;

    if (!authorId || !rating || !blogId || !text) {
      return res.status(400).send("Please fill your all details"); 
    }
    if (
      !mongoose.Types.ObjectId.isValid(authorId) ||
      !mongoose.Types.ObjectId.isValid(blogId)
    ) {
      return res.status(400).send("Please provide correct ids");
    }

    const user = await User.findById(authorId);

    if (!user) {
      return res.status(403).send("Forbidden");
    }

    const blog = await BlogU.findById(blogId);

    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    const comment = new Comment({
      author: authorId,
      blog: blogId,
      rating,
      text,
    });

    blog.comments.push(comment);

    await comment.save();
    await blog.save();

    return res.status(200).send("Successfully saved your comment");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
}

export async function deleteComment(req, res) {
  try {
    const { commentId, authorId } = req.body;

    if (!commentId || !authorId) {
      return res.status(400).send("Please provide all Details");
    }

    if (
      !mongoose.Types.ObjectId.isValid(authorId) ||
      !mongoose.Types.ObjectId.isValid(commentId)
    ) {
      return res.status(400).send("Please fill your all details");
    }

    await Comment.findByIdAndDelete(commentId);

    return res.status(200).send("Comment deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
}
