const router = require('koa-router')()
const sql = require('../../sql/login.sql')
router
    .post('/login',async (ctx, next) => {
        const user = ctx.request.body
    })
    .get('/login', async (ctx, next) => {
        

    })
    .get('/admindata', async(ctx, next) => {
        
    })

module.exports = router