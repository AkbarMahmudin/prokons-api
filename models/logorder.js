'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LogOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LogOrder.init(
    {
      transactionId: DataTypes.INTEGER,
      variantId: DataTypes.INTEGER,
      product: DataTypes.STRING,
      qty: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      transactionDate: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'log_orders',
      modelName: 'LogOrder',
    },
  );
  return LogOrder;
};
