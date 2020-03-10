var database = require('../database')
console.log(database.get('applications').find({email:'fuck'}).value())