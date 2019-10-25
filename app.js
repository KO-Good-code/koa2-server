const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const koajwt = require('koa-jwt')
const logger = require('koa-logger')
const cors = require('koa-cors')

const index = require('./routes/index')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text','formdata']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public/dist'))
app.use(cors({
  origin: '*',
  // allowMethods: ['GET', 'POST', 'DELETE','OPTIONS'],
}))



app.use((ctx, next) => {
  return next().catch((err) => {
      if (401 == err.status) {
          ctx.status = 401;
          ctx.body = 'Protected resource, use Authorization header to get access\n';
      } else {
          throw err;
      }
  });
});

//jwt 权限验证
app.use( koajwt({
  secret: 'shhhhh'
}).unless({
  path: [/^\/api\/home/,/^\/api\/post/,/^\/api\/tags/,/^\/api\/archive/,/^\/api\/console\/login/]
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
