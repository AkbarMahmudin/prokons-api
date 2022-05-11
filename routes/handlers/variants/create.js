const { Variant, Product } = require('../../../models');

module.exports = async (req, res) => {
  try {
    const [{
      productId,
    }] = req.body;
    const isExistsProdut = await Product.findByPk(productId);
    if (!isExistsProdut) {
      return res.status(404).json({
        status: 'error',
        message: 'product not found',
      });
    }

    const variant = await Variant.bulkCreate(req.body);

    return res.json({
      status: 'success',
      data: variant,
    });
  } catch (error) {
    return res.status(409).json({
      status: 'error',
      message: error.errors[0].message,
    });
  }
};
