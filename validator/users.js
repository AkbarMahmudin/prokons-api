const Joi = require('joi');

module.exports = (req, res, next) => {
  // validasi
  const schema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    role: Joi.string().valid('admin', 'cashier').required(),
  });

  const validateResult = schema.validate(req.body);
  if (validateResult.error) {
    return res.status(403).json({
      status: 'errror',
      message: validateResult.error.message,
    });
  }

  next();
};
