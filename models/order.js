/* eslint-disable array-callback-return */

'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Variant, {
        foreignKey: 'variantId',
        as: 'variants',
      });
      this.belongsTo(models.Transaction, {
        foreignKey: 'transactionId',
        as: 'transactions',
      });
    }
  }
  Order.init(
    {
      transactionId: DataTypes.INTEGER,
      variantId: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Order',
    },
  );

  Order.addHook('afterBulkCreate', 'insertLogOrder', async (order) => {
    order.map(async (o) => {
      const { transactionId, variantId, qty } = o;

      const variant = await sequelize.models.Variant.findOne({
        where: { id: o.variantId },
      });
      const {
        productId, color, size, price,
      } = variant;
      const product = await sequelize.models.Product.findOne({
        where: { id: productId },
      });

      const productName = `${product.name} ${color} ${size}`;

      const { transactionDate } = await sequelize.models.Transaction.findOne({
        where: { id: transactionId },
      });

      // update total
      const totalPrice = o.qty * price;
      await o.update({
        total: totalPrice,
      });

      // insert log orders
      await sequelize.models.LogOrder.create({
        transactionId,
        variantId,
        product: productName,
        qty,
        price,
        total: totalPrice,
        transactionDate,
      });
    });
  });
  return Order;
};
