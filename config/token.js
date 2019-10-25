var jwt = require('jsonwebtoken');
const token = Token => jwt.sign(Token, 'shhhhh', { expiresIn: '1h'});

module.exports = token