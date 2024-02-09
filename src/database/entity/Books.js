"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Book extends Model {
    static associate(models) {
      // Add associations here if needed
    }
  }

  Book.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      writer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      point: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Book", // Use singular name for the model
    }
  );

  return Book;
};
