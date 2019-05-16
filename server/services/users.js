const { pool } = require('../utils/pool');

const getUsers = async () => {
  try {
    const { rows } = await pool.query(`SELECT * FROM users`);
    return rows;
  } catch (e) {
    console.error(e);
  }
};

const getUserById = async userId => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM users WHERE id = ${userId}`
    );
    return rows[0];
  } catch (e) {
    console.error(e);
  }
};

const addUser = async (userName, password) => {
  try {
    const { rows } = await pool.query(
      `INSERT INTO users (username, password) VALUES ('${userName}', '${password}') RETURNING *`
    );
    console.log(rows);
    return rows[0];
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
};
