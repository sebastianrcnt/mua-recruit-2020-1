// Recruit Router(/recruit)
var router = require('express').Router();

router.use('/main', (req, res) => {
    res.render('main', {})
})

router.use('/apply', (req, res) => {
    res.render('apply', {})
})

router.use('/modify', (req, res) => {
    var id = req.query.id;
    var password = req.query.password;
    res.render('modify', {id: id, password: password})
})

// router.use('/apply', require('./apply'))
// router.use('/edit', require('./edit'))

module.exports = router;