const DataTypes = require("@sequelize/core");

// Local Modules
const db = require("../database.js");

// Model Initialization
const Item = db.define("item", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  childIds: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  },
});

module.exports = Item;
