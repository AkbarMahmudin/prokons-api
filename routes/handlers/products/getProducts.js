const { Product, Variant } = require('../../../models');

module.exports = async (req, res) => {
  const { name } = req.query;
  const sqlOption = {
    attributes: ['id', 'name', 'image'],
    include: {
      model: Variant,
      as: 'variants',
      attributes: ['id', 'color', 'size', 'isi', 'stock', 'price'],
    },
  };

  if (name) {
    sqlOption.where = {
      name,
    };
  }

  const product = await Product.findAll(sqlOption);
  product.map((p) => {
    p.image = `${req.protocol}://${req.get('host')}/images/${p.image ? p.image : 'no-photo-available.png'}`;
    return p;
  });

  return res.json({
    status: 'success',
    data: product,
  });
};
