var winston = require('winston');

function pad(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

function now() {
  var now = new Date();

  var offset = now.getTimezoneOffset();

  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDay()

  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  var milliseconds = now.getMilliseconds();

  // return `${year}-${month}-${day} GMT${offset/60} ${hour}:${pad(minute,2)}:${pad(second,2)}:${milliseconds}`
  return `${year}-${month}-${day} ${hour}:${pad(minute,2)}:${pad(second,2)}`

}

let myFormat = winston.format.printf(
  ({
    level,
    message
  }) => {
    return `${now()} ${level.toUpperCase()}: ${message}`;
  }
)

let logger = winston.createLogger({
  format: winston.format.combine(
    myFormat,
  ),
  transports: [
    new winston.transports.File({
      filename: 'logfiles/log-error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logfiles/log-warning.log',
      level: 'warning',
    }),
    new winston.transports.File({
      filename: 'logfiles/log-http.log',
      level: 'http',
    }),
    new winston.transports.File({
      filename: 'logfiles/log-silly.log',
      level: 'silly',
    }),
    new winston.transports.Console({
      level: 'silly',
      format: winston.format.combine(
        winston.format.simple(),
      )
    })
  ]
});


// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     level: 'silly'
//   }))
// }

console.log('[WINSTON LOGGER ACTIVATED]')

module.exports = logger;