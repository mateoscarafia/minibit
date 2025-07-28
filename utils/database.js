const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("minibit_study", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

module.exports = { sequelize };
