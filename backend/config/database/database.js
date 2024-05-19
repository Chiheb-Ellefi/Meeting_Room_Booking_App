const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  //"postgres://chiheb:123456789@localhost:5432/test",
  process.env.PSQL_URI,
  { dialect: "postgres" }
);

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({
      alter: true,
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = { connect, sequelize };
