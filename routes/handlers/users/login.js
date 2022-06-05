const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User, RefreshToken } = require('../../../models');

const {
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_REFRESH_TOKEN_EXPIRED,
} = process.env;

module.exports = async (req, res) => {
  const { username, password } = req.body;

  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  const validateResult = schema.validate(req.body);
  if (validateResult.error) {
    return res.status(403).json({
      status: 'errror',
      message: validateResult.error.message,
    });
  }

  const user = await User.findOne({
    where: { username },
  });
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'user not found',
    });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(404).json({
      status: 'error',
      message: 'invalid password',
    });
  }

  // create token
  const accessToken = jwt.sign({ data: user }, JWT_SECRET, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
  });
  const refreshToken = jwt.sign({ data: user }, JWT_SECRET_REFRESH_TOKEN, {
    expiresIn: JWT_REFRESH_TOKEN_EXPIRED,
  });

  // insert token to db
  await RefreshToken.create({
    token: refreshToken,
    userId: user.id,
  });

  return res.json({
    status: 'success',
    data: {
      token: accessToken,
      refreshToken,
    },
  });
};
