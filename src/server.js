const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { NotFound } = require("http-errors");

const app = express();
const { PORT } = process.env;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

require("./mongo");

app.use("/api/v1", require("./routes"));

app.use((_req, _res, next) => {
  next(NotFound("API not found"));
});

app.use((error, _req, res, _next) => {
  res.status(error.status || 500).send({
    success: false,
    message: error.message || "Internal Server Error",
  });
});

app.start = () =>
  app.listen(PORT, () => console.log("Server start on port 5000"));

module.exports = app;
