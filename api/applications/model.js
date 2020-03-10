// todo-delete
global.reqlib = require('app-root-path').require;
var logger = reqlib('util/logger.js')

var database = reqlib('database.js');

// 저장되는 객체
var Schema = {
    _id: 'sampleid',
    name: '장영환',
    password: 'mua130226',
    email: 'haepari@mua.com',
    major: 'Mechanical Engineering',
    phone: '010-1234-5678',
    session: ['보컬', '기타'],
    introduction: 'introduction',
    availableTime: [
        [1, 1], [1, 2]
    ]
}

function Application() { }

/**
 * @function {Application.exists}
 * @param  {string} key   {key in db}
 * @param  {any} value {value in db}
 * @return {boolean} {whether item with (key, value) exists in db}
 */
Application.exists = function (key, value) {
    var criteria = {};
    criteria[key] = value;
    return !!database.get('applications').find(criteria).value();
}

/**
 * @function {Application.count}
 * @param  {string} key   {key in db}
 * @param  {any} value {value in db}
 * @return {number} {count all item with (key, value) in db}
 */
Application.count = function (key, value) { // returns length
    var criteria = {};
    criteria[key] = value;
    return database.get('applications').filter(criteria).value().length;
}


/**
 * @function {Application.getById}
 * @param  {string} id {application id}
 * @return {application} {return application with id}
 */
Application.getById = function (id) {
    return database.get('applications').find({ _id: id }).value();
}



module.exports = Application;

/*
email(identifier)
password(hashed)

name
major
phone number
type(multiple selection)
introduction
available time(1-1, 3-8)

videolink
 */

// OLD

/*
// CREATE
Application.create = function (data) {
    logger.verbose(`Creating Application ...`)
    // password, email이 있고, email 이 unique할 때!
    return new Promise((resolve, reject) => {
        // 1. password, email exist?
        if (!data.password || !data.email) {
            reject({status:400, data:`no password or email`})
            return;
        }

        // 2. email unique?
        if (database.get('applications').filter({ email: data.email }).size().value() > 0) {
            reject({status:409, data:`email ${data.email} is occupied`})
            return;
        }

        data._id = shortid.generate();
        database.get('applications').push(data).write();
        resolve({ status: 201, data: data._id })
    })
}

// Replace(put)
Application.replaceById = function (id, data) {
    logger.verbose(`Replacing Application with id : ${id} ...`)
    return new Promise((resolve, reject) => {
        var application = Application.getById(id);
        // 1. id에 맞는 application 존재
        if (!application) {
            reject({status:404, data:`no such application with id ${id}`})

            return;
        }

        // 2. email 중복확인
        if (database.get('applications').filter({ email: data.email }).size().value() > 1) {
            reject({status:409, data:`email ${data.email} is occupied`})
            return;
        }

        Application.deleteById(application._id)
        data._id = application._id;
        database.get('applications').push(data).write();
        resolve({ status: 201, data: data._id || id });
    })
}

Application.deleteById = function (id) {
    return new Promise((resolve, reject) => {
        var application = Application.getById(id);

        // 1. application 존재
        if (!application) {
            reject({status:404, data:'application not found'})
            return;
        }

        database.get('applications').remove({ _id: id }).write();
        resolve({ status: 200, data: id });
    })
}

Application.clear = function () {
    database.get('applications').remove({}).write();
}
*/