const responseMiddleware = (req, res, next) => {
    res.err ? res.send(res.err) : res.send(res.data);
    next();
}

exports.responseMiddleware = responseMiddleware;