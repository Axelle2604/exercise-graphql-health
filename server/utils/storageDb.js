const usersData = {
  text: `INSERT INTO users (id, username, password) VALUES($1, $2, $3) RETURNING *`,
  values1: [0, 'user1', 'pswd1'],
  values2: [1, 'user2', 'pswd2'],
};

const userConsumptions = {
  text: `INSERT INTO user_consumptions (id, userid, date, alcool_quantity, water_quantity, exercise_quantity, calories_quantity) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
  values1: [0, 0, '2019-01-01', 0, 5, 30, 1200],
  values2: [1, 0, '2019-01-02', 0, 5, 30, 1200],
  values3: [2, 0, '2019-01-03', 0, 7, 30, 1200],
  values4: [3, 0, '2019-01-04', 1, 5, 30, 600],
  values5: [4, 0, '2019-01-05', 3, 5, 0, 1200],
  values6: [5, 1, '2019-01-01', 0, 5, 30, 1200],
  values7: [6, 1, '2019-01-02', 0, 5, 30, 1200],
  values8: [7, 1, '2019-01-03', 0, 7, 30, 1200],
  values9: [8, 1, '2019-01-04', 1, 5, 30, 600],
  values10: [9, 1, '2019-01-05', 3, 5, 0, 1200],
};

module.exports = { usersData, userConsumptions };
