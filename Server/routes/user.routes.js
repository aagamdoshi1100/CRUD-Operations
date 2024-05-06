const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
const JWT_SECRET = process.env.SECRET;
const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const loginResponse = await User.findOne({ email });
    if (!loginResponse) {
      return res.status(404).json({ message: "user not found" });
    } else {
      const decoded = await bcrypt.compare(password, loginResponse.password);
      if (loginResponse.email === email && decoded) {
        const token = jwt.sign(
          { email: loginResponse.email, isAdmin: loginResponse.isAdmin },
          JWT_SECRET,
          {
            expiresIn: "24h",
          }
        );
        const {
          _doc: { password, ...propertiesWOPass },
        } = loginResponse;
        res.status(200).json({
          loggedInUser: propertiesWOPass,
          message: "Login success",
          token,
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
    console.error(e);
  }
});

authRouter.post("/signup", async (req, res) => {
  const { email, isAdmin } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const signUpResponse = await User.create({
      email,
      password: hashedPassword,
      isAdmin,
    });
    const token = jwt.sign(
      { email: signUpResponse.email, isAdmin: signUpResponse.isAdmin },
      JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    const {
      _doc: { password, ...propertiesWOPass },
    } = signUpResponse;
    res.status(201).json({
      message: "New user created",
      data: { createdUser: propertiesWOPass, token },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = authRouter;
