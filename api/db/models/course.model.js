const mongoose = require("mongoose");

const Course = new mongoose.Schema({
  title: { type: String, required: "This field is required" },
  desc: { type: String, required: "This field is required" },
  videos: { type: Array, required: "This field is required" },
  price: { type: String, required: "This field is required" },
});

mongoose.model("Course", Course);
