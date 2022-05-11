const { Product } = require('../../../models');

module.exports = async (req, res) => {
  const { name } = req.body;
  const product = await Product.create({
    name,
  });

  return res.json({
    status: 'success',
    data: product,
  });
};
