const { Product, Variant } = require('../../../models');

module.exports = async (req, res) => {
  const { name } = req.query;
  const sqlOption = {
    attributes: ['id', 'name'],
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

  return res.json({
    status: 'success',
    data: product,
  });
};
