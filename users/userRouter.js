const express = require("express");
const router = express.Router();
const UserDb = require("./userDb");
const {
  checkUserID,
  deleteUserID,
  checkUpdateData,
} = require("../middleware/users");

router.post("/", (req, res) => {
  // do your magic!
  UserDb.insert(req.body)
    .then((postUser) => {
      if (postUser) {
        res.status(200).json({ message: "users found", UserDb: postUser });
      } else {
        res.status(400).json({ message: "no users found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "something went wrong, please try again later",
      });
    });
});

router.post("/:id/posts", checkUserID(), (req, res) => {
  // do your magic!
  const user_id = req.params.id;
  const text = req.body;
  if (!text) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide text for comment" });
  }
  const newUserPost = { text, user_id };
  UserDb.insert(newUserPost)
    .then((newPost) => {
      if (newPost) {
        res
          .json(201)
          .json({ message: "new user post added", newUser: newPost });
      } else {
        res.json(404).json({ message: "can not post a new user post" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "something went wrong, please try again laterzz",
      });
    });
});

router.get("/", (req, res) => {
  // do your magic!
  UserDb.get(req.body)
    .then((getUsers) => {
      if (getUsers) {
        res.status(200).json({ message: "users found", UserDb: getUsers });
      } else {
        res.status(400).json({ message: "no users found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "something went wrong, please try again later",
      });
    });
});

router.get("/:id", checkUserID(), (req, res) => {
  // do your magic!
  //middleware from middleware/posts.js
  res.status(200).json({ message: "User By Id found", UserID: req.userById });
});

router.get("/:id/posts", checkUserID(), (req, res) => {
  // do your magic!
  UserDb.getUserPosts(req.params.id)
    .then((findUserId) => {
      if (findUserId) {
        res
          .status(200)
          .json({ message: "user by Post ID found", UserPosts: findUserId });
      } else {
        res.status(404).json({ message: "no user post ID found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "something went wrong, please try again later",
      });
    });
});

//DELETE
router.delete("/:id", checkUserID(), deleteUserID(), (req, res) => {
  // do your magic!
  //MIDDLEWARE ADDED from users middleware
  res
    .status(200)
    .json({ message: "Deleted User", UserDeleted: req.deleteUser });
});

router.put("/:id", checkUpdateData(), checkUserID(), (req, res) => {
  // do your magic!
  const changes = req.body;
  const { id } = req.params;

  UserDb.update(id, changes)
    .then((updated) => {
      res.status(200).json(updated);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "something went wrong, please try again later",
      });
    });
});

module.exports = router;
