const { Conflict, BadRequest } = require("http-errors");
const { User } = require("../models/user.model");
const { generateAccessToken } = require("../utils/jwt");

module.exports = {
  SignUp: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const existUser = await User.findOne({ email });
      if (existUser) {
        throw Conflict("Email already exists.");
      }
      const newUser = new User({ email, password });
      const savedUser = await newUser.save();

      const accessToken = await generateAccessToken({
        _id: savedUser._id,
        email: savedUser.email,
      });

      res.send({
        success: true,
        message: "Sign up successfully",
        result: accessToken,
      });
    } catch (error) {
      next(error);
    }
  },
  SignIn: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        throw BadRequest("Email is not exists.");
      }

      if (!user.isValidPassword(password)) {
        throw BadRequest("Password is wrong");
      }
      const accessToken = await generateAccessToken({
        _id: user._id,
        email: user.email,
      });

      res.send({
        success: true,
        message: "Sign in successfully",
        result: accessToken,
      });
    } catch (error) {
      next(error);
    }
  },
};
