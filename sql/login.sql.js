const query = require('../service/service')


const CEATER_ADMIN =() => query.query(
    `create table if not exists Admin(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL,
     password VARCHAR(100) NOT NULL,
     avator VARCHAR(100),
     age DATE,
     PRIMARY KEY ( id )
    );`)
const INTO_ADMIN = (value) => query.query(`insert into Admin set name=?,password=?,avator=?,age=?;`,value)

const FIND_ADMIN = (name) =>query.query(`select * from Admin where name="${name}"`)

module.exports = {CEATER_ADMIN,INTO_ADMIN,FIND_ADMIN}