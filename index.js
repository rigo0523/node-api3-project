// code away!
const express = require("express");
const server = require("./server");

server.use(express.json());

//middleware will go here

//Post and User router
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");

server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

///MIDDLEWARE FOR CATCH errors, when adding 4 parementers it knows
//its handling an error from CATCH
server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "something went wrong, please try again later",
  });
});
