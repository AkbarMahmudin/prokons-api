const { LogOrder, sequelize } = require('../../../models');

function todayData(logOrders) {
  const todayDate = new Date().toLocaleDateString();

  const todayIncome = logOrders.length
    ? logOrders
      .filter((orders) => orders.transactionDate.toLocaleDateString() === todayDate)
      .map((data) => data.total)
      .reduce((total, totalOrder) => total + totalOrder)
    : 0;

  const totalOrder = logOrders.length
    ? logOrders
      .filter((orders) => orders.transactionDate.toLocaleDateString() === todayDate)
      .map((data) => data.qty)
      .reduce((total, qtyOrder) => total + qtyOrder)
    : 0;

  return {
    totalOrder,
    todayIncome,
  };
}

function monthlyData(logOrders) {
  const date = new Date();
  const mounthlyIncome = logOrders.length
    ? logOrders
      .filter((orders) => (
        orders.transactionDate.getMonth() === date.getMonth()
        && orders.transactionDate.getFullYear() === date.getFullYear()
      ))
      .map((data) => data.total)
      .reduce((total, totalOrder) => total + totalOrder)
    : 0;

  const totalOrder = logOrders.length
    ? logOrders
      .filter((orders) => (
        orders.transactionDate.getMonth() === date.getMonth()
        && orders.transactionDate.getFullYear() === date.getFullYear()
      ))
      .map((data) => data.qty)
      .reduce((total, qtyOrder) => total + qtyOrder)
    : 0;

  return {
    totalOrder,
    mounthlyIncome,
  };
}

function yearlyData(logOrders) {
  const yearDate = new Date().getFullYear();
  const yearlyIncome = logOrders.length
    ? logOrders
      .filter((orders) => orders.transactionDate.getFullYear() === yearDate)
      .map((data) => data.total)
      .reduce((total, totalOrder) => total + totalOrder)
    : 0;

  const totalOrder = logOrders.length
    ? logOrders
      .filter((orders) => orders.transactionDate.getFullYear() === yearDate)
      .map((data) => data.qty)
      .reduce((total, qtyOrder) => total + qtyOrder)
    : 0;

  return {
    totalOrder,
    yearlyIncome,
  };
}

module.exports = async (req, res) => {
  const logOrders = await LogOrder.findAll();

  const today = todayData(logOrders);
  const mounth = monthlyData(logOrders);
  const year = yearlyData(logOrders);

  res.json({
    status: 'success',
    data: {
      today,
      mounth,
      year,
    },
  });
};
