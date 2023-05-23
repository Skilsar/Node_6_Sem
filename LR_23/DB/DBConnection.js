const Sequelize = require("sequelize");

const sequelize = new Sequelize("LR_23_Node", "user", "qwer1234", {
  dialect: "mssql",
});

module.exports = sequelize;
