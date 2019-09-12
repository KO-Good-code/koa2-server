const router = require('koa-router')()
const sql = require('../../sql/home.sql')

router
    //首页数据
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
    //帖子详情
    .get('/post', async(ctx, next) => {
        let { post_id } = ctx.query
        const result = await sql.SELECT_CONTANT(post_id)
        ctx.body = result[0]
    })
    //标签页
    .get('/tags', async(ctx, next) => {
        const res = await sql.FIND_TAGS()
        let _r = res.map( res => {
            let r = res.tags.split(",")
            res.tags = r
            return res
        })
        let result = []
        _r.map( res => {
            result = result.concat(res.tags)
        })
        console.log(res)
        ctx.body = [...new Set(result)]
    })

module.exports = router