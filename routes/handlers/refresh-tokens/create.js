const Joi = require('joi');
const { User, RefreshToken } = require('../../../models');

module.exports = async (req, res) => {
  const { userId } = req.body;
  const { refreshToken } = req.body;

  const schema = Joi.object({
    userId: Joi.number().required(),
    refreshToken: Joi.string().required(),
  });

  const validateResult = schema.validate(req.body);
  if (validateResult.error) {
    return res.status(400).json({
      status: 'errror',
      message: validateResult.error.message,
    });
  }

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'user not found',
    });
  }

  const createdRefreshToken = await RefreshToken.create({ token: refreshToken, userId });

  return res.json({
    status: 'success',
    data: {
      id: createdRefreshToken.id,
    },
  });
};
