const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const dbConfig = require("../config").db[process.env.NODE_ENV || "development"];

const basename = path.basename(__filename);
const db = {};

mongoose.connect(
  `mongodb://${dbConfig.DB_HOSTNAME}:${dbConfig.DB_PORT}/${dbConfig.DB_NAME}`
);

fs.readdirSync(__dirname)
  .filter((fileName) => fileName !== basename && /.js$/.test(fileName))
  .forEach((fileName) => {
    const model = require(path.resolve(__dirname, fileName));
    db[model.modelName] = model;
  });

module.exports = db;
