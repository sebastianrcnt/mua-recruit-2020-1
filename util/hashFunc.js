const crypto = require('crypto')

module.exports = function(content, secret) {
    return crypto.createHmac('sha256', secret).update(content).digest('hex');
}