'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Variant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, { foreignKey: 'productId', as: 'products' });
      this.hasMany(models.Order, { as: 'orders' });
    }
  }
  Variant.init(
    {
      productId: DataTypes.INTEGER,
      color: DataTypes.STRING,
      size: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Variant',
    },
  );
  return Variant;
};
