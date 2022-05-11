const Joi = require('joi');

module.exports = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
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
