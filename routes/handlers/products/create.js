const isBase64 = require('is-base64');
const base64Img = require('base64-img');

const { Product } = require('../../../models');

module.exports = async (req, res) => {
  const { name, image } = req.body;

  // cek image is base64
  if (!isBase64(image, { mimeRequired: true })) {
    return res.status(400).json({
      status: 'error',
      message: 'invalid base64',
    });
  }

  base64Img.img(image, './public/images', Date.now(), async (err, filePath) => {
    if (err) return res.status(400).json({ status: 'error', message: err.message });

    const filename = filePath.split('\\').pop().split('/').pop();

    const product = await Product.create({
      name, image: filename,
    });

    return res.json({
      status: 'success',
      data: {
        id: product.id,
        name: product.name,
        image: `${req.get('host')}/images/${filename}`,
      },
    });
  });
};
