/* eslint-disable camelcase */
const { Op, Sequelize } = require('sequelize');
const { Transaction, Order, User } = require('../../../models');

module.exports = async (req, res) => {
  const { start_date, end_date } = req.query;
  const sqlOption = {
    attributes: ['id', 'status', 'transactionDate', [Sequelize.fn('COUNT', Sequelize.col('orders.id')), 'totalOrder']],
    include: {
      model: Order,
      as: 'orders',
      attributes: [],
    },
    group: 'orders.transactionId',
  };

  if (start_date && end_date) {
    sqlOption.where = {
      transactionDate: {
        [Op.between]: [start_date, end_date],
      },
    };
  }

  const transaction = await Transaction.findAll(sqlOption);

  return res.json({
    status: 'success',
    data: transaction,
  });
};
