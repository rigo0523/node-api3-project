const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("../middleware/logger");

//serverr
const server = express();

//middleware will go here global
server.use(helmet());
// server.use(cors());
server.use(logger("long"));
server.use(express.json());

//Post and User router imports
const postRouter = require("../posts/postRouter");
const userRouter = require("../users/userRouter");
const welcomeRouter = require("../welcomeRouter/welcome-router");

//server endpoints ---->
server.use("/", welcomeRouter);
server.use("/api/posts", postRouter);
server.use("/api/users", userRouter); // can also add cors(), in the serverr endpoint
//so like /api/users, cors(), userRouter) to only show endpoints that we want users to see

///MIDDLEWARE FOR CATCH errors, when adding 4 parementers it knows
//its handling an error from CATCH
server.use((err, req, res, next) => {
  console.log("global 500 error---->", err);
  res.status(500).json({
    message: "something went wrong, please try again later",
  });
});

module.exports = server;
