const Users = require("../users/usersHelper");

/// LOOKS FOR findById MIDDLEWARE /api/posts/:id
function checkUserID() {
  return (req, res, next) => {
    Users.getById(req.params.id)
      .then((userById) => {
        if (userById) {
          //middleware
          req.userById = userById;
          next();
        } else {
          res.status(404).json({ message: "no user found with this ID" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: "something went wrong, please try again later",
        });
      });
  };
}

function deleteUserID() {
  return (req, res, next) => {
    //import Get BY ID from userRouter here
    Users.remove(req.params.id)
      .then((deleteUser) => {
        if (deleteUser) {
          //apply middleware and sent to USER DELETE router
          req.deleteUser = deleteUser;
          next();
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
  };
}

function checkUpdateData() {
  // can be used for POSTING A USER TOO
  return (req, res, next) => {
    if (!req.body.name) {
      return res.status(400).json({ message: "missing name field" });
    }
    next();
  };
}

module.exports = {
  checkUserID,
  deleteUserID,
  checkUpdateData,
};
