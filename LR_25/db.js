const { Sequelize } = require("sequelize");

module.exports = new Sequelize("lab_25", "user", "qwer1234", {
  dialect: "mssql",
  host: "localhost",
  port: 1433,
  define: {
    timestamps: false,
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});
