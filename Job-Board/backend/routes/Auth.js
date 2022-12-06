const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authenticateToken = require("../middleware/authenticate");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // check if user with email already exists
  const user = await User.findOne({ email });
  if (user) {
    res.status(406).json({
      message: "User with this email, already exists",
      status: "fail",
    });
    return;
  }

  // create salt and hash password
  const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
  const hashedPassword = bcrypt.hashSync(password, salt);
  const newUser = await User.create({ name, email, password: hashedPassword });
  if (!newUser) {
    res.json({ message: "Error while creating user", status: "fail" });
    return;
  }
  const token = jwt.sign(
    { email: newUser.email, _id: newUser._id },
    process.env.ACCESS_TOKEN_SECRET
  );
  res.status(201).json({ token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // check if user with email exists
  if (!user) {
    res.status(401).send({ message: "Wrong Credentials" });
    return;
  }
  // check for passord
  if (!bcrypt.compareSync(password, user.password)) {
    res.status(401).send({ message: "Wrong Credentials" });
    return;
  }

  const token = jwt.sign(
    { email: user.email, id: user._id },
    process.env.ACCESS_TOKEN_SECRET
  );
  res.json({ token });
});

router.post("/logout", (req, res) => {
  req.user = {};
  res.json({ message: "logout", status: "success" });
});

router.get("/me", authenticateToken, async (req, res) => {
  const user = await User.findOne({
    email: req.user.email,
  }).select("-password");
  res.json(user);
});

module.exports = router;
