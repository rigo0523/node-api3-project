const PostDb = require("../posts/postDb");

/// LOOKS FOR findById MIDDLEWARE /api/posts/:id
function checkUserID() {
  return (req, res, next) => {
    PostDb.getById(req.params.id)
      .then((postById) => {
        if (postById) {
          //send postBYID to res.status(200).json(postById) on /api/posts/:id
          //attach post byId to the request
          //so we can access it in later middleware functions
          req.postById = postById;

          //add NEXT() ---> this will stop and send to the route handler get BY ID
          //on the postRouter.js file if true
          next();
        } else {
          res.status(200).json({ message: "can't retrieve post by ID" });
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

function deletePostID() {
  return (req, res, next) => {
    PostDb.remove(req.params.id)
      .then((deletePost) => {
        if (deletePost > 0) {
          //APPLY MIDDLWARE FOR DELETE POST
          req.deletePost = deletePost;
          //once delete, stop and go to router.delete on postrouter
          next();
        } else {
          res.status(200).json({ message: "can't Delete post by ID" });
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

module.exports = {
  checkUserID,
  deletePostID,
};
