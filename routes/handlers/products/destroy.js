const { Product } = require('../../../models');

module.exports = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByPk(id);
  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: 'product not found',
    });
  }

  await product.destroy();

  return res.json({
    status: 'success',
    message: 'product deleted',
  });
};
