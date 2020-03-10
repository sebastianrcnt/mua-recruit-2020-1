module.exports = function(req, res, next) {
    logger.http(`${req.method} ${req.path}`)
    next();
}