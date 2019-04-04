const query = require('../service/service')

const sql = {
    getUserData:(start, end) => query.query(`select name,age,city,address,region,uuid from user where id>=${start} AND id<=${end}`),
    upUserData: (user) => query.query(`UPDATE user SET name=${user.name},city=${user.city},region=${user.region},address=${user.address} WHERE uuid = ${user.uuid}`),
    upShopData:() => query.query(`UPDATE business SET address='外滩17号' WHERE uuid = 1`),
    judgeRoot:(name) => query.query(`select root from admin where name = ${name}`),
    deleteUser:(name) => query.query(`delete from user where name = ${name}`)
}

module.exports = sql