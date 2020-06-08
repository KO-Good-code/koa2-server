const mysql = require('mysql');

//创建数据池
const pool = mysql.createPool({
    // host : '127.0.0.1',
    host : '120.76.245.227',
    user : 'root',
    password : 'cr19950216',
    database : 'chenrui'
})

class Sqlserve {
    
    constructor() {}

    async query (sql, value:any = []) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err) {
                    reject(err)
                }else{
                    connection.query(sql, value, (err, rows) => {
                        if(err){
                            console.log(err)
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

export default new Sqlserve()