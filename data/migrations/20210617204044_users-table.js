exports.up = function (knex) {
  return knex.schema
    .createTable("users", function (tbl) {
      tbl.increments();
      tbl.string("name").notNullable().unique();
    })
    .createTable("posts", function (tbl) {
      tbl.increments();
      tbl.text("text").notNullable();

      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("posts").dropTableIfExists("users");
};
