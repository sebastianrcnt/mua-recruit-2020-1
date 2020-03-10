// API Router
var router = require('express').Router();

router.use('/applications', require('./applications'))

module.exports = router;