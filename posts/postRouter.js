const express = require("express");
const { checkPostID, deletePostID } = require("../middleware/posts");

const PostDb = require("./postDb");
const router = express.Router();

//GET /api/posts
router.get("/", (req, res) => {
  // do your magic!
  PostDb.get(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json({ message: "got post", PostDb: post });
      } else {
        res.status(404).json({ message: "no list of posts found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "something went wrong, please try again later",
      });
    });
});

//GET by ID /api/posts/:id
router.get("/:id", checkPostID(), (req, res) => {
  // do your magic!
  res.status(200).json(req.postById);
});

//DELETE by ID /api/posts/:id
router.delete("/:id", checkPostID(), deletePostID(), (req, res) => {
  // do your magic!
  //MIDDLE WARE on posts.js
  res.status(200).json(req.deletePost);
});

//PUT by ID /api/posts/:id
router.put("/:id", checkPostID(), (req, res) => {
  // do your magic!

  PostDb.update(req.params.id, req.body)
    .then((updatePost) => {
      if (updatePost) {
        res.status(200).json(updatePost);
      } else {
        res.status(400).json({ message: "cant update this postID" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "server error " });
    });
});

module.exports = router;
