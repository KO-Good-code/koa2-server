const router = require('koa-router')({prefix: '/console'})
const sql = require('../../sql/user.sql')
const homeSql = require('../../sql/home.sql')
const token = require('../../config/token')


router
    .post('/login',async (ctx,next) => {
        let {
            username,
            passward
        } = ctx.request.body
        const res = await sql.FIND_ADMIN(username)
        if(res[0] && res[0].passward === passward) {
            let tk = token({username,passward})
            ctx.body = {
                code: 0,
                userInfo_token: tk,
                msg: '登录成功'
            }
        }else {
            ctx.body = {
                code: 0,
                msg: '密码错误'
            }
        }
    })
    .get('/postList', async (ctx, next ) => {
        try {
            let {
                pageSize
            } = ctx.query
            const res = await homeSql.SELECT_LIST(pageSize)
            let result = res.map( res => {
                let r = res.tags.split(",")
                res.tags = r
                return res
            })
            ctx.body = {
                code: 200,
                data: result
            }
        } catch (error) {
            ctx.body = {
                code: 0,
                msg: '服务端出错'
            }
        }
    })
    .get('/post', async ( ctx, next ) => {
        try {
            let { post_id } = ctx.query
            const result = await homeSql.SELECT_CONTANT(post_id)
            ctx.body = {
                data:result[0],
                code: 200
            }
        } catch (error) {
            ctx.body = {
                code: 0,
                msg: '服务端出错'
            }
        }
    })

module.exports = router