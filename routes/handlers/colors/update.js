const { Color } = require('../../../models');

module.exports = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const color = await Color.findByPk(id);
  if (!color) {
    return res.status(404).json({
      status: 'error',
      message: 'user not found',
    });
  }
  await color.update({ name });

  return res.json({
    status: 'success',
    data: color,
  });
};
