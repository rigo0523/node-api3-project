const db = require("../data/dbConfig.js");

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};

function get() {
  return db("posts");
}

function getById(id) {
  return db("posts").where({ id }).first();
}
//api/posts ---> post is a placeholder for req.body since we are grabbing the whole body of post from client
function insert(post) {
  return db("posts")
    .insert(post, "id")
    .then((ids) => {
      // this is nesting deeper into outputting only the single ID
      return db("posts").where({ id: ids }).first();
    });
}

//api/posts/:id ---> updating per ID of post, changes is the placeholder or req.body
function update(id, changes) {
  return db("posts").where({ id }).update(changes);
}

function remove(id) {
  return db("posts").where("id", id).del();
}
