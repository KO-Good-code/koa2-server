const query = require('../service/service')

const ADMIN = {
    CEATER_ADMIN : () => query.query(
        `create table if not exists Admin(
         id INT NOT NULL AUTO_INCREMENT,
         name VARCHAR(100) NOT NULL,
         password VARCHAR(100) NOT NULL,
         avator VARCHAR(100),
         root INT NOT NULL,
         age DATE(),
         PRIMARY KEY ( id )
        );`),
    INTO_ADMIN : (value) => query.query(`insert into Admin set name=?,password=?,avator=?,age=?,root=1;`,value),
    FIND_ADMIN_NAME : (name) =>query.query(`select * from Admin where name="${name}"`),  
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