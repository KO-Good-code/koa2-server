var jwt = require('jsonwebtoken');
const token = Token => jwt.sign(Token, 'mytoken', { expiresIn: '24h'});

module.exports = token