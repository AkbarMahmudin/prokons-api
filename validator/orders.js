const Joi = require('joi');

module.exports = async (req, res, next) => {
  const schema = Joi.array().items(Joi.object({
    variantId: Joi.number().required(),
    qty: Joi.number().required(),
  }));

  const validateResult = schema.validate(req.body);
  if (validateResult.error) {
    return res.status(400).json({
      status: 'errror',
      message: validateResult.error.message,
    });
  }

  next();
};
