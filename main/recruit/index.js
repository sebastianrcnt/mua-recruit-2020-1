// Recruit Router
var router = require('express').Router();

router.use('/', (req, res) => {
    res.send('recruit request')
});

module.exports = router;