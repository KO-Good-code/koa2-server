const router = require('koa-router')({prefix: '/api'})
const login = require('./login/login')


router.use(login.routes(),login.allowedMethods())

module.exports = router
