import mongoose from "mongoose";
import bcrytpjs from "bcryptjs";
const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
});
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrytpjs.hash(this.password, 12);
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
