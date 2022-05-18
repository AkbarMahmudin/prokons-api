const { Product, Variant } = require('../../../models');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { color, size, isi } = req.query;
  const sqlOption = {
    model: Variant,
    as: 'variants',
    attributes: ['id', 'color', 'size', 'isi', 'stock', 'price'],
  };

  if (color && size && isi) {
    sqlOption.where = {
      color, size, isi,
    };
  }

  const product = await Product.findOne({
    attributes: ['id', 'name', 'image'],
    where: {
      id,
    },
    include: sqlOption,
  });
  product.image = `${req.get('host')}/images/${product.image ? product.image : 'no-photo-available'}}`;

  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: 'product not found',
    });
  }

  return res.json({
    status: 'success',
    data: product,
  });
};
