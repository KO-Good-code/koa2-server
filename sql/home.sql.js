const query = require('../service/service')

const ADMIN = {
    SELECT_LIST: (...arg) => query.query(`SELECT tags, title, id, time FROM blog_contant limit ${8*(arg[0] - 1)}, 8`),     // 获取contant表数据 {name} 列名
    SELECT_CONTANT : (id) => query.query(`SELECT contant, title, tags FROM blog_contant where id="${id}"`),  //查询特定的帖子
    SELECT_COUNT : () =>query.query(`select count(*) from blog_contant`),  //查询帖子总数
    FIND_TAGS : () =>query.query(`select tags, title, id from blog_contant`),  //查询帖子标签和id
    FIND_ALL_TIME : () =>query.query(`select time, id, title from blog_contant Order By time Desc`),
    ADD_AGE: () => query.query(
        `SELECT a.dat,a.num,SUM(lt.num)  AS cum FROM
        (SELECT DATE_FORMAT(age,'%Y-%m-%d') AS dat,COUNT(*) num FROM Admin GROUP BY dat)  a
        JOIN
        (SELECT DATE_FORMAT(age,'%Y-%m-%d') AS dat,COUNT(*) num FROM Admin GROUP BY dat)  lt
        ON a.dat >= lt.dat GROUP BY dat`
    )  
}

module.exports = ADMIN;