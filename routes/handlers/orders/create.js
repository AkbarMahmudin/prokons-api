const { Op } = require('sequelize');
const { Variant, Transaction, Order } = require('../../../models');

module.exports = async (req, res) => {
  try {
    const variantIds = req.body.map((v) => v.variantId);
    const variants = await Variant.findAll({
      where: {
        id: {
          [Op.in]: variantIds,
        },
      },
    });

    if (!variants.length) {
      return res.status(404).json({
        status: 'error',
        message: 'product variants not found',
      });
    }

    if (variantIds.length !== variants.length) {
      return res.status(404).json({
        status: 'error',
        message: 'There are product variations not available',
      });
    }

    const userId = req.user.data.id;
    const transaction = await Transaction.create({
      userId,
      status: 'paid',
      transactionDate: Date.now(),
    });

    const bodyPayload = req.body.map((body) => ({
      transactionId: transaction.id,
      variantId: body.variantId,
      qty: body.qty,
    }));

    const orders = await Order.bulkCreate(bodyPayload);

    // update variant stock
    orders.map(async (order) => {
      const variant = await Variant.findByPk(order.variantId);
      const newStock = variant.stock - order.qty;

      await variant.update({ stock: newStock });
    });

    return res.json({
      status: 'success',
      data: orders,
    });
  } catch (error) {
    return res.status(409).json({
      status: 'error',
      message: error.errors[0].message,
    });
  }
};
