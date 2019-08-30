const query = require('../service/service')

const Select = `declare @a varchar(max)
select @a=isnull(@a+',','')+name from syscolumns   where   id=object_id( 'Blog_contant')   and   name <> 'ID'
exec ('select 
 from Blog_contant')`

const ADMIN = {
    SELECT_LIST: (...arg) => query.query(`SELECT tags, title, id, time FROM Blog_contant limit ${7*(arg[0] - 1)}, 7`),     // 获取contant表数据 {name} 列名
    SELECT_CONTANT : (id) => query.query(`SELECT contant FROM Blog_contant where id="${id}"`),
    FIND_ADMIN_NAME : (name) =>query.query(`select top 7 * from Admin where name="${name}"`),  
    FIND_ADMIN : () =>query.query(`select count(*) num from Admin`),  
    FIND_ADMIN_AGE : () =>query.query(`select age,COUNT(id) id from Admin group by age having count(age) > 0`),
    ADD_AGE: () => query.query(
        `SELECT a.dat,a.num,SUM(lt.num)  AS cum FROM
        (SELECT DATE_FORMAT(age,'%Y-%m-%d') AS dat,COUNT(*) num FROM Admin GROUP BY dat)  a
        JOIN
        (SELECT DATE_FORMAT(age,'%Y-%m-%d') AS dat,COUNT(*) num FROM Admin GROUP BY dat)  lt
        ON a.dat >= lt.dat GROUP BY dat`
    )  
}

module.exports = ADMIN;