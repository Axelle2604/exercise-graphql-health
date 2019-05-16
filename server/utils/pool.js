const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: 'healthapp',
  password: process.env.PASSWORD,
  port: 5432,
});

module.exports = { pool };
