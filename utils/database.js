const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("minibit_study", "root", "your_new_password", {
  host: "localhost",
  dialect: "mysql",
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
