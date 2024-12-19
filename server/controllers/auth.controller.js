import User from "../modals/user.modal.js";
import bcrytpjs from "bcryptjs";

export async function login(req, res) {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).send("please fill your all detsils");
    }
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(404).send("No user with provided credentials found");
    }

    const isMatch = await bcrytpjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).send("Password in incorrect");
    }

    res.status(200).json({
      userId: user._id,
      username: user.username,
      useremail: user.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
}

export async function register(req, res) {
  try {
    const { name, email, username, password } = req.body;

    if (!name || !email || !username || !password) {
      return res.status(400).send("Please fill all your details");
    }

    const useremail = await User.find({
      email: email,
    });

    if (useremail.length != 0) {
      return res.status(400).send("Email already exists");
    }

    const user = await User.find({
      username: username,
    });
    if (user.length != 0) {
      return res.status(400).send("Username already exists");
    }

    const newuser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
    });
    //yaha per

    await newuser.save();

    return res.status(200).json({
      userId: newuser._id,
      username: newuser.username,
      useremail: newuser.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
}
