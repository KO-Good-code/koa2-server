const router = require('koa-router')({prefix: '/api'})
const home = require('./home/home')
const user = require('./user/user')


router.use(home.routes(),home.allowedMethods())
router.use(user.routes(),user.allowedMethods())

module.exports = router
