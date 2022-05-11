const { Product } = require('../../../models');

module.exports = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const product = await Product.findByPk(id, {
    attributes: ['id', 'name'],
  });
  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: 'product not found',
    });
  }

  await product.update({
    name,
  });

  return res.json({
    status: 'success',
    data: product,
  });
};
