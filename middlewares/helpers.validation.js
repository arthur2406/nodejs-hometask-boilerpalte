const BAD_REQUEST_STATUS = 400;


const validate = (validations, req, res, next) => {
  validations.forEach((message, validation) => {
    if (!validation(req.body)) {
      res.status(BAD_REQUEST_STATUS);
      next(new Error(message));
    }
  });
  next();
};


module.exports = {
  validate,
}