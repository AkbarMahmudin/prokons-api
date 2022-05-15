const { Variant, Product } = require('../../../models');

module.exports = async (req, res) => {
  const {
    productId, size, color, isi,
  } = req.query;
  const sqlOption = {
    attributes: ['id', 'color', 'size', 'isi'],
    include: {
      model: Product,
      as: 'products',
      attributes: ['id', 'name'],
    },
  };
  let variant = await Variant.findAll(sqlOption);

  if (productId && size && color && isi) {
    sqlOption.where = {
      productId, size, color, isi,
    };
    variant = await Variant.findOne(sqlOption);
  }

  if (!variant) {
    return res.status(404).json({
      status: 'error',
      message: 'variant not found',
    });
  }

  return res.json({
    status: 'success',
    data: variant,
  });
};
