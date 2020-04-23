const router = require('koa-router')()
const sql = require('../../sql/home.sql')

router
    //首页数据
    .get('/home', async (ctx, next) => {
        let {
            pageSize
        } = ctx.query
        const res = await sql.SELECT_LIST(pageSize)
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
        const res = await sql.FIND_TAGS() //获取标签 title
        console.log(res)
        let result = {}
        res.map( res => {
            let r = res.tags
            if(!result.hasOwnProperty(r)){
                result[r] = []
            }
            let obj = res
            result[r].push(obj)
        })
        ctx.body = result
    })
    .get('/archive', async(ctx, next) => {
        const res = await sql.FIND_ALL_TIME()
        let result = {}
        res.map( o => {
            let r = new Date(o.time).getFullYear()
            if(!result.hasOwnProperty(r)){
                result[r] = []
            }
            result[r].push(o)
        })
        ctx.body = result
    })

module.exports = router