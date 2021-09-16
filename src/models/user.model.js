const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", function (next) {
  try {
    const salt = genSaltSync(5);
    const hashed = hashSync(this.password, salt);
    this.password = hashed;
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods = {
  isValidPassword: function (password) {
    return compareSync(password, this.password);
  },
};

module.exports.User = model("Users", UserSchema);
