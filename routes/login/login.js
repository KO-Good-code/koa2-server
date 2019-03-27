const router = require('koa-router')()

router
    .get('/login',async (ctx, next) => {
        ctx.body= 11111
    })
    .post('/login', async (ctx, next) => {
        console.log(ctx.request.body)
    })

module.exports = router