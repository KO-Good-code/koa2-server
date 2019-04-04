const router = require('koa-router')({prefix: '/api'})
const login = require('./login/login')
const user = require('./user/user')


router.use(login.routes(),login.allowedMethods())
router.use(user.routes(),user.allowedMethods())

module.exports = router
