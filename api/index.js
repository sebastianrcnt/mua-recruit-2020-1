// API Router
var router = require('express').Router();

router.use('/applications', (req, res, next) => {
    next();
},require('./applications'))

module.exports = router;