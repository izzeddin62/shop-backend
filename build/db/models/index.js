"use strict";

const fs = require("fs");
const path = require("path");
const process = require("process");
const Sequelize = require("sequelize");
const configuration = require("../config/config");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = configuration[env];
const db = {};
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.url);
}
fs.readdirSync(__dirname).filter(file => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js" && file.indexOf(".test.js") === -1).forEach(file => {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;