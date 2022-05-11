const express = require('express');

const router = express.Router();

const usersHandler = require('./handlers/users');
const verifyToken = require('../middleware/verifyToken');
const { userValidator } = require('../validator');

router.post('/login', usersHandler.login);
router.use(verifyToken);

router.delete('/logout', usersHandler.logout);
router.get('/:id', usersHandler.getUser);
router.put('/:id', userValidator, usersHandler.update);

router.use((req, res, next) => {
  const { role } = req.user.data;
  if (role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'bad authorization',
    });
  }
  next();
});

router.get('/', usersHandler.getUsers);
router.post('/', userValidator, usersHandler.create);
router.delete('/:id', usersHandler.destroy);

module.exports = router;
