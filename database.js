const Sequelize = require("@sequelize/core");
require("dotenv/config");

// Local Modules
const env = process.env;

// Database Initialization
const sequelize = new Sequelize({
  dialect: "postgres",
  database: env.DB_NAME,
  user: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  host: env.DB_HOST,
  port: 5432,
  ssl: false,
  clientMinMessages: 'notice',
});

module.exports = sequelize;
