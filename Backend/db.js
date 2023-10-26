const Pool = require("pg").Pool;
require("dotenv").config({ path: "./.env" });

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
  host: process.env.HOST,
});
// const

module.exports = pool;
