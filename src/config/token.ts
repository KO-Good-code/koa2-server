var jwt = require('jsonwebtoken');
const token = Token => jwt.sign(Token, 'mytoken', { expiresIn: '24h'});

export default token