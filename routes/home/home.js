const router = require('koa-router')()
const sql = require('../../sql/home.sql')

router
    .get('/home', async (ctx, next) => {

        
        ctx.body = 123

    })
    .get('/homeList', async(ctx, next) => {
        
    })

module.exports = router