// Main Router
var router = require('express').Router();

router.use('/recruit', require('./recruit'))

module.exports = router;