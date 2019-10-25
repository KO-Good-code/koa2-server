const query = require('../service/service')

const sql = {
    FIND_ADMIN : (...arg) =>query.query(`select passward from admin where admin='${arg[0]}'`),
}

module.exports = sql