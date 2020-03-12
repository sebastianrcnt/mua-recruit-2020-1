// API Router
var router = require('express').Router();

router.use('/applications', require('./applications'))
router.use('/evaluations', require('./evaluations'))

module.exports = router;