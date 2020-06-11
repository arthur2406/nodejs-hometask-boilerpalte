const { Router } = require('express');
const UserService = require('../services/userService');
const { userValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { errorHandlingMiddleware } = require('../middlewares/error.handling.middleware');

const router = Router();


router.get('/', async (req, res, next) => {
  try {
    const users = await UserService.searchAll();
    res.data = users;
    res.status(200);
  } catch (err) {
    next(err);
  }
  next();
}, responseMiddleware);

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await UserService.search({ id });
    if (user) {
      res.data = user;
      res.status(200);
    } else {
      res.status(404);
      next(new Error('User not found'));
    }
  } catch (err) {
     next(err);
  }

  next();
}, responseMiddleware);


router.post('/', userValid, async (req, res, next) => {
  try {
    const user = await UserService.create(req.body);
    res.data = user;
    res.status(201);
  } catch (err) {
    next(err);
  }
  
  next();
}, responseMiddleware);


router.put('/:id', userValid, async (req, res, next) => {
  try {
    const user = await UserService.update(req.params.id, req.body);
    if (user) {
      res.data = user;
      res.status(200);
    } else {
      res.status(404);
      next(new Error('User not found'));
    }
  } catch (err) {
    next(err);
  }
  next();
}, responseMiddleware);

router.delete('/:id', async (req, res, next) => {
  try {
    const user = await UserService.delete(req.params.id);
    if (user) {
      res.data = user;
      res.status(200);
    } else {
      res.status(404);
      next(new Error('User not found'));
    }
  } catch (err) {
    next(err);
  }
  
  next();
}, responseMiddleware);

router.use(errorHandlingMiddleware);

module.exports = router;