const mysql = require('mysql')
//创建数据池
const pool = mysql.createPool({
    host : '127.0.0.1',
    user : 'root',
    password : 'cr19950216',
    database : 'koa-Serve'
})

class Sqlserve {
    constructor() {}

    async query (sql, value = []) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err) {
                    reject(err)
                }else{
                    connection.query(sql, value, (err, rows) => {
                        if(err){
                            reject( err )
                        }else{
                            resolve( rows )
                        }
                        connection.release()
                    })
                }
            })
        })
    }
}

module.exports = new Sqlserve()