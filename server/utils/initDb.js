const { pool } = require('./pool');
const { usersData, userConsumptions } = require('./storageDb');

const tables = ['users', 'user_consumptions'];

const dropTables = async () => {
  try {
    await Promise.all(
      tables.map(async table => {
        await pool.query(`DROP TABLE ${table}`);
      })
    );
  } catch (e) {
    console.error(e);
  }
};

const createTables = async () => {
  try {
    await pool.query(
      `CREATE TABLE users (id BIGSERIAL, username TEXT, password TEXT);`
    );
  } catch (e) {
    console.error(e);
  }
  try {
    await pool.query(
      `CREATE TABLE user_consumptions (id BIGSERIAL, userid INT, date DATE, alcool_quantity INT, water_quantity INT, exercise_quantity INT, calories_quantity INT);`
    );
  } catch (e) {
    console.error(e);
  }
};

const fillTable = async (text, values) => {
  try {
    await pool.query(text, values);
  } catch (e) {
    console.error(e);
  }
};

const fillUsersTable = async () => {
  await fillTable(usersData.text, usersData.values1);
  await fillTable(usersData.text, usersData.values2);
};

const fillUserConsumptionsTable = async () => {
  await fillTable(userConsumptions.text, userConsumptions.values1);
  await fillTable(userConsumptions.text, userConsumptions.values2);
  await fillTable(userConsumptions.text, userConsumptions.values3);
  await fillTable(userConsumptions.text, userConsumptions.values4);
  await fillTable(userConsumptions.text, userConsumptions.values5);
  await fillTable(userConsumptions.text, userConsumptions.values6);
  await fillTable(userConsumptions.text, userConsumptions.values7);
  await fillTable(userConsumptions.text, userConsumptions.values8);
  await fillTable(userConsumptions.text, userConsumptions.values9);
  await fillTable(userConsumptions.text, userConsumptions.values10);
};

const fillTables = async () => {
  await fillUsersTable();
  await fillUserConsumptionsTable();
};

const initDb = async () => {
  await dropTables();
  await createTables();
  await fillTables();
};

initDb();
