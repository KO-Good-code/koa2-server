const router = require('koa-router')({prefix: '/console'})
const sql = require('../../sql/user.sql')
const homeSql = require('../../sql/home.sql')
const token = require('../../config/token')


router
    //登录
    .post('/login',async (ctx,next) => {
        let {
            username,
            passward
        } = ctx.request.body
        const res = await sql.FIND_ADMIN(username)
        if(res[0] && res[0].passward === passward) {
            let tk = token({username,passward})
            ctx.body = {
                code: 200,
                userInfo_token: tk,
                msg: '登录成功'
            }
        }else {
            ctx.body = {
                code: 0,
                msg: '密码错误或用户名错误'
            }
        }
    })
    // add post 
    .post('/post', async (ctx, next ) => {
        try {
            let {
                title,
                contant,
                tags
            } = ctx.request.body
            let time = new Date().getTime()
            await sql.ADD_BLOG_POST(
                title,
                contant,
                tags,
                time)
            ctx.body = {
                code: 200,
                msg: '操作成功'
            }
        } catch (error) {
            console.log(error)
            ctx.body = {
                code: 0,
                msg: '服务端出错'
            }
        }
    })
    //delete post 
    .delete('/post', async ( ctx, next ) => {
        try {
            let { post_id } = ctx.request.body
            await sql.DEL_BLOG_POST(post_id)
            ctx.body = {
                msg: '操作成功',
                code: 200
            }
        } catch (error) {
            console.log(error)
            ctx.body = {
                code: 0,
                msg: error.message
            }
        }
    })
    // update post data
    .put('/post', async ctx => {
        try {
            let { 
                title,
                contant,
                tags,
                id
            } = ctx.request.body
            let time = new Date().getTime()
            await sql.UP_BLOG_POST(
                {title,
                contant,
                tags,
                id,
                time}
            )
            ctx.body = {
                msg: '操作成功',
                code: 200
            }
        } catch (error) {
            console.log(error)
            ctx.body = {
                code: 0,
                msg: error.message
            }
        }
    })

module.exports = router