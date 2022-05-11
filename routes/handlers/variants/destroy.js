const { Variant } = require('../../../models');

module.exports = async (req, res) => {
  const { id } = req.params;

  const variant = await Variant.findByPk(id);
  if (!variant) {
    return res.status(404).json({
      status: 'error',
      message: 'variant not found',
    });
  }

  await variant.destroy();

  return res.json({
    status: 'success',
    message: 'variant deleted',
  });
};
