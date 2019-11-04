const query = require('../service/service')

const sql = {
    FIND_ADMIN : (...arg) =>query.query(`select passward from admin where admin='${arg[0]}'`),  //查找用户登录信息
    ADD_BLOG_POST : (...arg) =>query.query(`insert into blog_contant (title,contant,tags,time) values ("${arg[0]}", "${arg[1]}", "${arg[2]}", "${arg[3]}")`),  //写入博客帖子
    DEL_BLOG_POST : (...arg) =>query.query(`DELETE FROM blog_contant where id=${arg[0]}`),  //删除博客帖子
    UP_BLOG_POST : ({title,contant,tags,time,id}) =>query.query(`UPDATE blog_contant set title="${title}", contant="${contant}", tags="${tags}", time="${time}" where id=${id}`),  //修改博客帖子
}

module.exports = sql