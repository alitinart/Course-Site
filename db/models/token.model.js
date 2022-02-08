const mongoose = require("mongoose");

const refreshToken = new mongoose.Schema({
  token: { type: String, required: "This field is required" },
});

mongoose.model("refreshToken", refreshToken);
