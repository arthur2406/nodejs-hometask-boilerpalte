const { Router } = require('express');
const UserService = require('../services/userService');
const { userValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();


router.get('/', (req, res, next) => {
  const users = UserService.searchAll();
  res.data = users;
  res.status = 200;
  next();
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const user = UserService.search({ id });
  if (user) {
    res.data = user;
    res.status = 200;
  } else {
    res.err = { error: true, message: 'User not found' };
    res.status = 404;
  }
  next();
}, responseMiddleware);


router.post('/', userValid, (req, res, next) => {
  const user = UserService.create(req.body);
  res.data = user;
  res.status = 201;
  next();
}, responseMiddleware);


router.put('/:id', userValid, (req, res, next) => {
  const user = UserService.update(req.params.id, req.body);
  res.data = user;
  res.status = 204;
  next();
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
  const user = UserService.delete(req.params.id);
  if (user) {
    res.data = user;
    res.status = 204;
  } else {
    res.err = { error: true, message: 'User not found' };
    res.status = 404;
  }
  next();

}, responseMiddleware);


// TODO: Implement route controllers for user

module.exports = router;