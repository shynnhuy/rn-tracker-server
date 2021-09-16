const { InternalServerError } = require("http-errors");
const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRE } = process.env;

module.exports = {
  generateAccessToken: (payload) => {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        ACCESS_TOKEN_SECRET,
        {
          expiresIn: "30m",
          //   expiresIn: ACCESS_TOKEN_EXPIRE //FOR PROD,
        },
        (err, token) => {
          if (err) {
            reject(InternalServerError(err));
          }
          resolve(token);
        }
      );
    });
  },
};
