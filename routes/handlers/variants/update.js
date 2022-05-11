const { Variant } = require('../../../models');

module.exports = async (req, res) => {
  const { id } = req.params;
  const {
    color,
    size,
    isi,
    stock,
    price,
  } = req.body;

  const variant = await Variant.findByPk(id);
  if (!variant) {
    return res.status(404).json({
      status: 'error',
      message: 'variant not found',
    });
  }

  await variant.update({
    color,
    size,
    isi,
    stock,
    price,
  });

  return res.json({
    status: 'success',
    data: variant,
  });
};
