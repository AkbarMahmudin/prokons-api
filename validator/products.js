const Joi = require('joi');

module.exports = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string(),
  });

  const validateResult = schema.validate(req.body);
  if (validateResult.error) {
    return res.status(400).json({
      status: 'errror',
      message: validateResult.error.message,
    });
  }

  next();
};
