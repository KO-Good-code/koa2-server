const router = require('koa-router')()
const sql = require('../../sql/home.sql')

router
    .get('/home', async (ctx, next) => {
        let {
            pageSize
        } = ctx.query
        const res = await sql.SELECT_LIST(pageSize)
        console.log(res)
        let result =  res.map( res => {
            let r = res.tags.split(",")
            res.tags = r
            return res
        })
        
        ctx.body = result

    })
    .get('/post', async(ctx, next) => {
        let { post_id } = ctx.query
        const result = await sql.SELECT_CONTANT(post_id)
        ctx.body = result[0]
    })

module.exports = router