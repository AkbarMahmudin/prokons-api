const isBase64 = require('is-base64');
const base64Img = require('base64-img');
const fs = require('fs');

const { Product } = require('../../../models');

module.exports = async (req, res) => {
  const { name, image } = req.body;
  const { id } = req.params;
  const data = { name };

  const product = await Product.findByPk(id, {
    attributes: ['id', 'name', 'image'],
  });
  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: 'product not found',
    });
  }

  if (image) {
    // cek image is base64
    if (!isBase64(image, { mimeRequired: true })) {
      return res.status(400).json({
        status: 'error',
        message: 'invalid base64',
      });
    }

    // delete image exists
    if (product.image && fs.existsSync(`./public/images/${product.image}`)) {
      fs.unlinkSync(`./public/images/${product.image}`);
    }

    const filePath = base64Img.imgSync(image, './public/images', Date.now());
    const filename = filePath.split('\\').pop().split('/').pop();
    data.image = filename;
  }

  await product.update(data);
  product.image = `${req.protocol}://${req.get('host')}/images/${product.image}`;

  return res.json({
    status: 'success',
    data: product,
  });
};
