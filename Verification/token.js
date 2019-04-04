const jwt = require('jsonwebtoken')
const serect = 'jwtdemo'
// 添加token
const add = (userinfo) => {
    const token = jwt.sign({
        user: userinfo.user,
        id: userinfo.id
    }, serect, {expiresIn: '1h'})
    return token
}
//验证token
const decode = (token) => {
    const payload = jwt.decode(token.split(' ')[1], serect)
    return payload
}

module.exports = {add,decode}