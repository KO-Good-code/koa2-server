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
        let result =  res.map( res => {
            let r = res.tags.split(",")
            res.tags = r
            return res
        })
        console.log(result)
        ctx.body = result

    })
    .get('/homeList', async(ctx, next) => {
        
    })

module.exports = router