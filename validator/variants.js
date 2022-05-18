const Joi = require('joi');

module.exports = (req, res, next) => {
  const schema = Joi.array().items(Joi.object({
    productId: Joi.number().required(),
    color: Joi.string().required(),
    size: Joi.string().required(),
    isi: Joi.string().required(),
    stock: Joi.number(),
    price: Joi.number(),
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
