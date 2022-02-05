const mongoose = require("mongoose");

const Video = new mongoose.Schema({
  title: { type: String, required: "This field is required" },
  desc: { type: String, required: "This field is required" },
  link: { type: String, required: "This field is required" },
  course: { type: String, required: "This field is required" },
});

mongoose.model("Video", Video);
