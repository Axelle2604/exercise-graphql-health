const { pool } = require('../utils/pool');

const getUserConsumptionsByUserID = async userId => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM user_consumptions WHERE userid = ${userId}`
    );
    return rows;
  } catch (e) {
    console.error(e);
  }
};

const addUserConsumptions = async (
  userId,
  date,
  alcool_quantity,
  water_quantity,
  exercise_quantity,
  calories_quantity
) => {
  try {
    const { rows } = await pool.query(
      `INSERT INTO user_consumptions (userid, date, alcool_quantity, water_quantity, exercise_quantity, calories_quantity) VALUES (${userId}, ${date}, ${alcool_quantity}, ${water_quantity}, ${exercise_quantity}, ${calories_quantity}) RETURNING *`
    );
    return rows[0];
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  getUserConsumptionsByUserID,
  addUserConsumptions,
};
