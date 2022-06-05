const { Color } = require('../../../models');

module.exports = async (req, res) => {
  const colors = await Color.findAll({
    attributes: ['id', 'name'],
  });

  return res.json({
    status: 'success',
    data: colors,
  });
};
