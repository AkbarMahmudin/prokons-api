const bcrypt = require('bcrypt');
const { User } = require('../../../models');

module.exports = async (req, res) => {
  try {
    const {
      name,
      username,
      role,
    } = req.body;
    const password = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      name,
      username,
      password,
      role,
    });

    return res.json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    return res.status(409).json({
      status: 'error',
      message: error.errors[0].message,
    });
  }
};
