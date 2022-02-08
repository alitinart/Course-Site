const mongoose = require("mongoose");

const Course = new mongoose.Schema({
  image: { type: String, required: "This field is required" },
  title: { type: String, required: "This field is required" },
  desc: { type: String, required: "This field is required" },
  videos: { type: Array, required: "This field is required" },
  price: { type: String, required: "This field is required" },
  tags: { type: Array, required: "This field is required" },
});

mongoose.model("Course", Course);
