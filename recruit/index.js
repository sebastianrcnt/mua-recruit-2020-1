// Recruit Router(/recruit)
var router = require('express').Router();

router.use('/main', (req, res) => {
    res.redirect('/public/index.html')
})

// router.use('/apply', require('./apply'))
// router.use('/edit', require('./edit'))

module.exports = router;