const express = require("express");
const app = express();

const mongoose = require("mongoose");
const db = require("./db/db");

const Video = mongoose.model("Video");
const Course = mongoose.model("Course");
const User = mongoose.model("User");

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, PATCH");
  next();
});

/**
 *
 * Course Requests
 *
 * Methods: POST, GET, DELETE, PATCH
 *
 */

app.post("/course", (req, res) => {
  let newCourse = new Course({
    title: req.body.data.title,
    desc: req.body.data.desc,
    videos: req.body.data.videos,
    price: req.body.data.price,
  });

  newCourse.save().then((courseDoc) => {
    res.send(courseDoc);
  });
});

app.get("/course", (req, res) => {
  Course.find({}).then((courses) => {
    res.send(courses);
  });
});

app.get("/course/:id", (req, res) => {
  Course.find({ _id: req.params.id }).then((course) => res.send(course));
});

app.delete("/course/:id", (req, res) => {
  Course.findOneAndDelete({ _id: req.params.id }).then((removedCourseDoc) =>
    res.send(removedCourseDoc)
  );
});

app.patch("/course/:id", (req, res) => {
  Course.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }).then(
    (course) => res.send(course)
  );
});

/**
 *
 * Video Requests
 *
 * Methonds: POST, GET, DELETE, PATCH
 *
 */

app.post("/course/:id", (req, res) => {
  let newVideo = new Video({
    title: req.body.data.title,
    desc: req.body.data.desc,
    link: req.body.data.link,
    price: req.body.data.price,
  });

  newVideo.save().then((videoDoc) => {
    res.send(videoDoc);
  });
});

app.get("/video", (req, res) => {
  Video.find({}).then((courses) => {
    res.send(courses);
  });
});

app.get("/video/:id", (req, res) => {
  Video.find({ _id: req.params.id }).then((video) => res.send(video));
});

app.delete("/course/:id/:videoId", (req, res) => {
  Video.findOneAndDelete({ _id: req.params.videoId }).then((removedCourseDoc) =>
    res.send(removedCourseDoc)
  );
});

app.patch("/course/:id", (req, res) => {
  Course.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }).then(
    (course) => res.send(course)
  );
});

/**
 *
 * Auth Requests
 *
 * Methods: GET, POST, PATCH, DELETE
 *
 */

app.post("/users", (req, res) => {
  let newUser = new User({
    userName: req.body.data.username,
    password: req.body.data.password,
  });

  newUser.save().then((userDoc) => {
    res.send(userDoc);
  });
});

app.get("/users", (req, res) => {
  User.find({}).then((users) => res.send(users));
});

app.get("/users/id/:id", (req, res) => {
  User.find({ _id: req.params.id }).then((user) => {
    res.send(user);
  });
});

app.get("/users/:username", (req, res) => {
  User.find({ username: req.params.username }).then((user) => {
    res.send(user);
  });
});

app.patch("/course/:id", (req, res) => {
  User.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }).then(
    (user) => res.send(user)
  );
});

app.delete("/users/:id", (req, res) => {
  User.findOneAndDelete({ _id: req.params.id }).then((user) => {
    res.send(user);
  });
});

app.get("/users/admin/:id", (req, res) => {
  if (req.params.id === "61fceb471e18a915c0ede979") {
    res.send("True");
  } else {
    res.send("You are not a admin");
  }
});

app.listen(8000, () => {
  console.log("App listening on port 8000");
});
