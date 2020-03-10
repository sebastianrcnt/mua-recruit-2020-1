const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const adapter = new FileSync(path.join(__dirname, 'database.json'))
const db = low(adapter);

function initDB() {
    db.defaults({
        users: [],
        applications: [],
    })
}

module.exports = db