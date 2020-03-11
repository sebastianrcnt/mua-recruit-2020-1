// Applications router
var router = require('express').Router();
var database = reqlib('database.js')
var Application = require('./model')
var shortid = require('shortid')


// get request
router.get('/', (req, res) => { // query:(id or email)+password, success(id), failure(msg)
    var id = req.query.id;
    var email = req.query.email;
    var password = req.query.password;

    // check id exist or email exist
    if (!id && !email) {
        res.status(400).send(`id or email is not provided`)
        return;
    }

    // check password exist
    if (!password) {
        res.status(400).send(`password is not provided`)
        return;
    }

    // get by id exist
    if (id) {
        var application = database.get('applications').find({ _id: id }).value();
        // check application exist
        if (!application) {
            res.status(404).send(`application not found for ${id}`)
            return
        }

        // check password match
        if (password !== application.password) {
            res.status(401).send(`password wrong for ${id}`)
            return
        }

        res.status(200).send(application);
        return;
    }

    if (email) {
        var application = database.get('applications').find({ email: email }).value();
        // check application exist
        if (!application) {
            res.status(404).send(`application not found for email ${email}`)
            return;
        }

        // check password match
        if (password !== application.password) {
            res.status(401).send(`password wrong for ${email}`)
            return;
        }

        res.status(200).send(application);
        return;
    }
})


router.post('/', (req, res) => { // body:json(parsed/raw) -> success(id), failure(msg)
    var newApplication = req.body;
    var email = newApplication.email;
    var password = newApplication.password;

    // check both email and password exist in body
    if (!(email && password)) {
        res.status(400).send(`email or password missing`)
        return;
    }

    // check if email is not used
    if (Application.exists('email', email)) {
        res.status(409).send(`application with email ${email} already exists`)
        return;
    }

    newApplication._id = shortid.generate();
    database.get('applications').push(newApplication).write();
    res.status(201).send(newApplication._id)
    return;
})

router.put('/', (req, res) => { // body: json
    var newApplication = req.body;
    console.log(newApplication)
    var id = newApplication._id;
    var email = newApplication.email;
    var password = newApplication.password;

    // check if application has required parameters(_id, email, password)
    if (!(id && email && password)) {
        res.status(400).send(`email or password missing`)
        return;
    }

    // check if application with id exists in db
    var oldApplication = Application.getById(newApplication._id)
    if (!oldApplication) {
        res.status(404).send(`application not found for id ${id} `)
        return;
    }

    // check if email is not used
    if (Application.count('email', email) > 1) {
        res.status(409).send(`application with email ${email} already exists`)
        return;
    }

    // remove application
    database.get('applications').remove({_id: id}).write();

    // replace with current application
    database.get('applications').push(newApplication).write();
    res.status(201).send(newApplication._id);
    return;
})

router.delete('/', (req, res) => { // query: id
    var id = req.query.id;
    
    // check if query has required parameters(id)
    if (!id) {
        res.status(400).send(`id is missing`)
        return;
    }

    // check if application with given id exists
    var targetApplication = Application.getById(id);
    if (!targetApplication) {
        res.status(404).send(`application not found for id ${id}`)
        return;
    }

    database.get('applications').remove({_id: id}).write();
    return;
})

module.exports = router;