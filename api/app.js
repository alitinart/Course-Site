const express = require("express");
const app = express();

require("dotenv").config();

const mongoose = require("mongoose");
const db = require("./db/db");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const stripe = require("stripe")(
  "sk_test_51JE9SYC2iQe3nGmGILbK481s4WeAq3RsAUy33lir3iL5pqemhVrJHXK1lIpcTx1hL5W7O7eWdIZlS1TmUlwQ6bE300ziA0e5CO"
);
const uuid = require("uuid").v4;

const Video = mongoose.model("Video");
const Course = mongoose.model("Course");
const User = mongoose.model("User");
const RefreshTokenModel = mongoose.model("refreshToken");

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, PATCH");
  next();
});

/**
 *
 * Stripe Requests
 *
 * Methods: POST, GET
 *
 */

app.post("/payment", authenticateToken, (req, res) => {
  const { product, token } = req.body;
  const idempotencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchase of ${product.name}`,
        },
        { idempotencyKey }
      );
    })
    .then((result) => {
      Course.findOne({ _id: product.productId }).then((course) => {
        let newCourses = req.user._doc.courses;
        newCourses.unshift(course.title);
        User.findOneAndUpdate(
          { _id: req.user._doc._id },
          { $set: { courses: [...newCourses] } }
        ).then((userDoc) => {
          const newAccessToken = generateAccessToken(JSON.stringify(userDoc));

          res.send(newAccessToken);
        });
      });
    })
    .catch((err) => console.log(err));
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
    videos: [],
    price: req.body.data.price,
    tags: [...req.body.data.tags],
    image: req.body.data.image,
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
    courseId: req.params.id,
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

// Sign Up

app.post("/users", async (req, res) => {
  User.find({ userName: req.body.data.username }).then(async (users) => {
    if (users.length <= 0) {
      try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.data.password, salt);
        let newUser = new User({
          userName: req.body.data.username,
          password: hashedPassword,
        });

        newUser.save().then((userDoc) => {
          res.send(userDoc);
        });
      } catch {
        res.status(500).send();
      }
    } else {
      res.send("User with that username already exists");
    }
  });
});

// Login

app.post("/users/login", async (req, res) => {
  User.find({ userName: req.body.data.username }).then(async (user) => {
    if (user.length <= 0) {
      res.send("No user with that username");
    }
    try {
      if (await bcrypt.compare(req.body.data.password, user[0].password)) {
        const newUser = { ...user[0] };
        const accessToken = generateAccessToken(JSON.stringify(newUser));
        const refreshToken = jwt.sign(
          newUser,
          process.env.REFRESH_TOKEN_SECRET
        );
        const newRefreshToken = new RefreshTokenModel({
          token: refreshToken,
        });
        newRefreshToken.save();
        res.json({ accessToken: accessToken, refreshToken: refreshToken });
      } else {
        res.send();
      }
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  });
});

// Auth Token

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) {
    return res.send("No Token");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.send("Forbbiden");
    }
    req.user = user;
    next();
  });
}

app.get("/auth/token", authenticateToken, (req, res) => {
  res.send("Allowed");
});

function generateAccessToken(user) {
  return jwt.sign(JSON.parse(user), process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
}

// Create Token

app.post("/token", (req, res) => {
  const refreshToken = req.body.data.token;
  if (refreshToken === null) {
    res.sendStatus(401);
  }
  RefreshTokenModel.find({ token: refreshToken }).then((tokens) => {
    if (tokens.length <= 0) {
      res.sendStatus(403);
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return console.log(err);
      const accessToken = generateAccessToken({
        userName: user.username,
        password: user.password,
        _id: user._id,
      });
      res.json({ accessToken: accessToken });
    });
  });
});

app.get("/users/admin/", authenticateToken, (req, res) => {
  if ("61ffb1f9feaded4b5cc3502a" === req.user._doc._id) {
    res.send("True");
  } else {
    res.send("You are not a admin");
  }
});

// Return all users

app.get("/users", (req, res) => {
  User.find({}).then((users) => res.send(users));
});

app.get("/user", authenticateToken, (req, res) => {
  res.send(req.user._doc);
});

app.get("/users/:id", (req, res) => {
  User.find({ _id: req.params.id }).then((user) => {
    res.send(user);
  });
});

app.patch("/users/:id", (req, res) => {
  User.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }).then(
    (user) => res.send(user)
  );
});

app.delete("/users/:id", (req, res) => {
  User.findOneAndDelete({ _id: req.params.id }).then((user) => {
    res.send(user);
  });
});

/**
 *
 * Stripe Key
 *
 */

app.get("/key", (req, res) => {
  res.send(
    "pk_test_51JE9SYC2iQe3nGmGaErsDUIhNvHnTN7li1huLVyywU5ZMRX5p8ImIv8mJLhoC9HEVlDkU7FxJmRW9F3kx32Buxs100RdqkzIkQ"
  );
});

app.get("/token", (req, res) => {
  res.send(process.env.STRIPE_TOKEN);
});

app.listen(8000, () => {
  console.log("App listening on port 8000");
});
