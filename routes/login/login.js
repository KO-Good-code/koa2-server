const router = require('koa-router')()
const sql = require('../../sql/login.sql')
const TOKE_SERVICE = require('../../Verification/token')

router
    .post('/login',async (ctx, next) => {
        const user = ctx.request.body
        let data = [
            user.username,
            user.password,
            '',
            new Date().toLocaleDateString()
        ]
        let into = await sql.FIND_ADMIN_NAME(user.username).then(res => {
            if(res.length === 0){
                return true
            }else{
                let success = {
                    code: 1,
                    message: '登录成功！',
                    token: TOKE_SERVICE.add({user:res[0].name,id:res[0].id}),
                    level:res[0].root
                }
                let err = {
                    message: '该用户已存在，密码输入错误'
                }
                user.password === res[0].password ? ctx.body = success:ctx.body = err;
            }
        })
        if(into){
            await sql.INTO_ADMIN(data).then(res => {
                ctx.body = {
                    code: 1,
                    message: '登录成功！',
                    token: TOKE_SERVICE.add({user:user.username,id:res.insertId}),
                    level:1
                }
            })
        }
    })
    .get('/login', async (ctx, next) => {
        const token = ctx.header.authorization  // 获取jwt
        let payload
        if (token) {
            payload = await TOKE_SERVICE.decode(token)  // // 解密，获取payload
            ctx.body = {
                message: '登录成功',
                code: 1,
                payload
            }
        } else {
            ctx.body = {
            message: 'token 错误',
            code: -1
            }
        }

    })
    .get('/admindata', async(ctx, next) => {
        const token = ctx.header.authorization  // 获取jwt
        let payload,age=[],date=[]
        if(token){
            payload = await TOKE_SERVICE.decode(token)
            await sql.ADD_AGE().then(res => {
                ctx.body =res
            })
        }
        
    })

module.exports = router