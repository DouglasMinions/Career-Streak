const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateToken = async (req, res, next) => {
  if (!req.headers || !req.headers.authorization) {
    res.status(400).send("Could not authenticate");
  }

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  if (!jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)) {
    res.status(400).send("Could not authenticate");
  }

  const { email } = jwt.decode(token);
  const user = await User.findOne({ email }).select("-password");
  if (!user) {
    res.status(400).send("Could not authenticate");
  }
  req.user = { email, _id: user._id.toString(), role: user.role };
  next();
};

module.exports = authenticateToken;
