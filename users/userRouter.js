const express = require("express");
const router = express.Router();
const User = require("./usersHelper");
const {
  checkUserID,
  deleteUserID,
  checkUpdateData,
} = require("../middleware/users");

//api/users GET ALL USERS
router.get("/", (req, res) => {
  // do your magic!
  User.get(req.body)
    .then((getUsers) => {
      if (getUsers) {
        res.status(200).json({ message: "users found", Users_list: getUsers });
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

//api/users/:id GET BY ID
router.get("/:id", checkUserID(), (req, res) => {
  // do your magic!
  //middleware from middleware/users.js
  res.status(200).json({ message: "User By Id found", UserID: req.userById });
});

//api/users POST
router.post("/", checkUpdateData(), (req, res) => {
  // checkUpdateData(), checks if no name key, enter 'name' warning coming from middleware users.js, used to check property on both update and post
  User.insert(req.body)
    .then((postUser) => {
      if (postUser) {
        res.status(200).json({ message: "users found", User: postUser });
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
  //checkuser ID coming from middleware on users.js, just reassures that we have the correct ID
  // do your magic!
  //not working, need to look into this one
  const user_id = req.params.id;
  const text = req.body;
  if (!text) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide text for comment" });
  }

  User.insert(text) // added another help funciton
    //which is inserUsertPOST
    .then((newPost) => {
      console.log(newPost, "newpost---->");
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

router.get("/:id/posts", checkUserID(), (req, res) => {
  // do your magic!
  User.getUserPosts(req.params.id)
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
  //MIDDLEWARE ADDED from users middleware users.js
  res
    .status(200)
    .json({ message: "Deleted User", UserDeleted: req.deleteUser });
});

router.put("/:id", checkUpdateData(), checkUserID(), (req, res) => {
  // do your magic!
  const changes = req.body;
  const { id } = req.params;

  User.update(id, changes)
    .then((updated) => {
      res.status(200).json({ updated_user: updated });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "something went wrong, please try again later",
      });
    });
});

module.exports = router;
