const {
  Transaction, Order, User, Variant, Product,
} = require('../../../models');

module.exports = async (req, res) => {
  const { id } = req.params;

  const transaction = await Transaction.findOne({
    attributes: ['id', 'status', 'transactionDate'],
    where: {
      id,
    },
    include: [
      {
        model: Order,
        as: 'orders',
        attributes: ['id', 'qty'],
        include: {
          model: Variant,
          as: 'variants',
          attributes: ['id', 'color', 'size', 'isi', 'stock', 'price'],
          include: {
            model: Product,
            as: 'products',
            attributes: ['id', 'name'],
          },
        },
      },
      {
        model: User,
        as: 'users',
        attributes: ['id', 'name', 'username', 'role'],
      },
    ],
  });

  transaction.dataValues.totalOrder = transaction.orders.length;

  return res.json({
    status: 'success',
    data: transaction,
  });
};
