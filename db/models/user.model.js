const mongoose = require("mongoose");

const User = new mongoose.Schema({
  userName: { type: String, required: "This field is required" },
  password: { type: String, required: "This field is required" },
  imgPath: { type: String },
  courses: { type: Array },
});

mongoose.model("User", User);
