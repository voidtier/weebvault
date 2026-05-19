import express from "express";
const router = express.Router();
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import authentify from "../middlewares/authentication.middleware.js";
import user from "../models/user.model.js";

router.post("/signup", async function (req, res) {
  try {
    // log this if you need
    // console.log(req.body);
    const { firstname, lastname, email, username, password } = req.body;

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUSer = new user({
      name: {
        firstname: firstname,
        lastname: lastname,
      },
      email,
      username,
      password: hashedPassword,
    });
    await newUSer.save();
    res.status(201).redirect("/signin");
  } catch (error) {
    res.status(500).send("Error saving user: " + error.message);
  }
});

router.post("/signin", async function (req, res) {
  // log this if you need
  // console.log(req.body);
  try {
    const { email, password } = req.body;
    const foundUser = await user.findOne({ email });

    if (!foundUser) {
      return res.redirect("/signin?logerror=email or password is incorrect");
    }

    const corretPassword = await bcryptjs.compare(password, foundUser.password);

    if (!corretPassword) {
      return res.redirect("/signin?logerror=email or password is incorrect");
    }

    const token = jsonwebtoken.sign(
      {
        id: foundUser._id,
        username: foundUser.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, { httpOnly: true });
    return res.redirect("/");
  } catch (error) {
    return res.status(500).send("Error logging in: " + error.message);
  }
});

router.get("/user", authentify, async function (req, res) {
  const userId = req.user._id || req.user.id;
  try {
    const foundUser = await user.findById(userId);

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ username: foundUser.username, name: foundUser.name });
  } catch (error) {
    console.log(`:${error}`);
  }
});

// router.get("/signout", function (req, res) {
//   res.clearCookie("token");
// });

export default router;
