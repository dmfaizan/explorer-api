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
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

Item.hasMany(Item, {
  as: "children",
  foreignKey: {
    name: "parentId",
    allowNull: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  inverse: {
    as: "parent",
  },
});

Item.belongsTo(Item, {
  as: "parent",
  foreignKey: {
    name: "parentId",
    allowNull: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});

module.exports = Item;
