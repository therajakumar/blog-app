import { mongoose } from "mongoose";

const commentSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: true,
  },
  rating: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  blog: {
    type: String,
    require: true,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
