const { Router } = require('express');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { errorHandlingMiddleware } = require('../middlewares/error.handling.middleware');
const { isAuth } = require('../middlewares/auth.middleware');
const passport = require('passport');
const { route } = require('./userRoutes');

const router = Router();

router.post('/login', passport.authenticate('local'),  (req, res, next) => {
  res.data = req.user;
  res.status(200);
  next();
}, responseMiddleware);


router.post('/logout', isAuth, (req, res, next) => {
  req.logout();
  res.data = { message: 'You have succesfully logged out' };
  res.status(200);
  next();
}, responseMiddleware);

router.use(errorHandlingMiddleware);


module.exports = router;