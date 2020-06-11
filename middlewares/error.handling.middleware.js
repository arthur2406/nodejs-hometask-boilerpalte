const errorHandlingMiddleware = (err, req, res, next) => {
  if (err.message === 'Invalid data') {
    res.status(400);
  } else if (err.message === 'Database error') {
    res.status(500);
    err.message = 'Server error, please try again later';
  } 
  res.send({ error: true, message: err.message }); 
};

exports.errorHandlingMiddleware = errorHandlingMiddleware;