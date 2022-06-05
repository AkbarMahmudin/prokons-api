const { Color } = require('../../../models');

module.exports = async (req, res) => {
  try {
    const { name } = req.body;

    const color = await Color.create({
      name,
    });

    return res.json({
      status: 'success',
      data: color,
    });
  } catch (error) {
    return res.status(409).json({
      status: 'error',
      message: error.errors[0].message,
    });
  }
};
