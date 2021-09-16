const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI);

mongoose.connection.on("connected", () => console.log("MongoDB connected"));
mongoose.connection.on("error", (error) =>
  console.log("MongoDB connection error: " + error)
);