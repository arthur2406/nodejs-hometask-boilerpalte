const responseMiddleware = (req, res, next) => {
  res.send(res.data);
};

exports.responseMiddleware = responseMiddleware;