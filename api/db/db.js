const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb+srv://admin:admin%40nartaliti@cluster0.58b7d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  (err) => {
    if (!err) {
      console.log("Successfully connected to MongoDB :)");
    } else {
      console.log("Error in connection " + err);
    }
  }
);

require("./models/course.model");
require("./models/video.model");
require("./models/user.model");
