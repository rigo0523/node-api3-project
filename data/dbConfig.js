require("dotenv").config();
const knex = require("knex");
const knexConfig = require("../knexfile.js");
//NODE_ENV automatically set to production by heroku, no need to add to env file
const enviroment = process.env.NODE_ENV || "development";

module.exports = knex(knexConfig[enviroment]);
