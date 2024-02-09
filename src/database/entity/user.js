"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Add associations here if needed
    }
  }

  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      role: DataTypes.ENUM("customer", "admin"),
      password: DataTypes.STRING,
      points: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User", // Use singular name for the model
    }
  );

  return User;
};
