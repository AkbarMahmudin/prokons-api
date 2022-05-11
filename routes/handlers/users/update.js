const { User } = require('../../../models');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      username,
      role,
    } = req.body;

    const user = await User.findByPk(id, {
      attributes: ['id', 'name', 'username', 'role'],
    });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'user not found',
      });
    }

    if (username) {
      const checkUsername = await User.findOne({
        where: { username },
      });

      if (checkUsername && username !== user.username) {
        return res.status(403).json({
          status: 'error',
          message: 'username already exsist',
        });
      }
    }

    const userUpdated = await user.update({
      name,
      username,
      role,
    });

    return res.json({
      status: 'success',
      data: userUpdated,
    });
  } catch (error) {
    return res.status(409).json({
      status: 'error',
      message: error.errors[0].message,
    });
  }
};
