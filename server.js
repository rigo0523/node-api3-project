const express = require("express");
const server = express();

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`***Server listening on Port ${PORT}***`);
});
//custom middleware

// function logger(req, res, next) {}

// //custom middleware

// function validateUserId(req, res, next) {
//   // do your magic!
// }

// function validateUser(req, res, next) {
//   // do your magic!
// }

// function validatePost(req, res, next) {
//   // do your magic!
// }

module.exports = server;
