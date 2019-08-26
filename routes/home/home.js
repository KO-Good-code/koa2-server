const router = require('koa-router')()
const sql = require('../../sql/home.sql')

router
    .get('/home', async (ctx, next) => {
        let {
            name,
            time,
            tags
        } = ctx.query
        const res = await sql.SELECT_CONTANT(name,time,tags)
        console.log(res)
        ctx.body = res

    })
    .get('/homeList', async(ctx, next) => {
        
    })

module.exports = router