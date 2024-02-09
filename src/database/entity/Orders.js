"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: "userid", as: "OrdersUser" });
      Order.belongsTo(models.Book, { foreignKey: "bookid", as: "BooksOrder" });
    }
  }

  Order.init(
    {
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Order", // Use singular name for the model
    }
  );

  return Order;
};
