'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Order, { as: 'orders' });
      this.belongsTo(models.User, { as: 'users', foreignKey: 'userId' });
    }
  }
  Transaction.init(
    {
      userId: DataTypes.INTEGER,
      status: DataTypes.ENUM('process', 'paid'),
      transactionDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Transaction',
    },
  );
  return Transaction;
};
