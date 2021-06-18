const db = require("../data/dbConfig.js");

module.exports = {
  get,
  getById,
  getUserPosts,
  insert,
  update,
  remove,
  insertUserPost,
};

function get() {
  return db("users");
}

function getById(id) {
  return db("users").where({ id }).first();
}

//api/users/posts
function getUserPosts(userId) {
  // return db("posts")
  //   .join("users", "users.id", "posts.user_id")
  //   .select("p.id", "p.text", "u.name as postedBy")
  //   .where("p.user_id", userId);

  return db("users") // reverse and it works the same way
    .join("posts", "users.id", "=", "posts.user_id")
    .select("posts.id", "posts.text", "users.name as postedByUser")
    .where("posts.user_id", userId);
}

//POST //api/users --> user is the placeholder for req.body which in this case, would be the name of user only as well as the id which is automatically added by knex
function insert(user) {
  return db("users")
    .insert(user)
    .then((ids) => {
      //ids makes sure we targed the selected ID on posts
      return db("users").where({ id: ids }).first();
    });
}

function insertUserPost(userbody, postID) {
  return db("posts").insert(userbody).where({ user_id: postID });
}

function update(id, changes) {
  return db("users")
    .update(changes)
    .where({ id }) // or where({id: id})
    .then((ids) => {
      // console.log("ids--->", ids); // ids is 1, so use ID instead for update
      return db("users").where({ id: id }).first();
    });
}

function remove(id) {
  return db("users").where("id", id).del();
}
