const { User } = require('../../../models');

module.exports = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'user not found',
    });
  }

  await user.destroy();

  return res.json({
    status: 'success',
    message: 'user deleted',
  });
};
