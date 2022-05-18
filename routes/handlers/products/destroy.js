const fs = require('fs');

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

  fs.unlink(`./public/images/${product.image}`, async (err) => {
    if (err) return res.status(400).json({ status: 'error', message: err.message });

    await product.destroy();

    return res.json({
      status: 'success',
      message: 'product deleted',
    });
  });
};
