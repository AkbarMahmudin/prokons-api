const { Product, Variant } = require('../../../models');

module.exports = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByPk(id, {
    attributes: ['id', 'name'],
    include: {
      model: Variant,
      as: 'variants',
      attributes: ['id', 'color', 'size', 'isi', 'stock', 'price'],
    },
  });
  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: 'user not found',
    });
  }

  return res.json({
    status: 'success',
    data: product,
  });
};
