global.reqlib = require('app-root-path').require;
var logger = reqlib('util/logger');
global.logger = logger;

// Import Modules
var http = require('http');
var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')

var app = express();
var server = http.createServer(app);
var port = process.env.PORT || 2020;
var cookieParser = require('cookie-parser');

// Import Middlewares
var requestLogger = reqlib('util/request-logger.js')

// App Start
// Parse
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.use(cookieParser('130226'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Routing
app.use(requestLogger);
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/api', require('./api'))

// connect main
app.use('/recruit', require('./recruit'))
app.use('/', (req, res) => {
    res.redirect('/applications/main')
})

// Start Server
server.listen(port);