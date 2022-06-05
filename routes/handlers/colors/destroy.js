const { Color } = require('../../../models');

module.exports = async (req, res) => {
  const { id } = req.params;

  const color = await Color.findByPk(id);
  if (!color) {
    return res.status(404).json({
      status: 'error',
      message: 'color not found',
    });
  }

  await color.destroy();

  return res.json({
    status: 'success',
    message: 'color deleted',
  });
};
