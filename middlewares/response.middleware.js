const responseMiddleware = (req, res, next) => {
   // TODO: Implement middleware that returns result of the query
    res.err ? res.send(res.err) : res.send(res.data);
    next();
}

exports.responseMiddleware = responseMiddleware;