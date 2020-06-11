
const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401);
    next(new Error('You are not authorized'))
  }
}

exports.isAuth = isAuth;