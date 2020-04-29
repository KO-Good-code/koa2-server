import * as Koa from 'koa';
import router, { load, errorMiddleware } from './middleware/decorator'
import * as bodyParser from 'koa-bodyparser';
import * as json from 'koa-json';
import * as jwt from 'koa-jwt';

const app = new Koa();

load('routes');

app.use(errorMiddleware());

app.use(bodyParser({
  enableTypes: ['json', 'form', 'text','formdata']
}))

app.use(json());

app.use(
  jwt({
    secret: 'mytoken'
  }).unless({
    path: [/^\/api\/home/,/^\/api\/post/,/^\/api\/tags/,/^\/api\/archive/,/^\/console\/login/]
  })
)

app.use(router.routes()); // 加载路由

app.listen(3000, '0.0.0.0',()=> {
  console.log('Server is running at http://localhost:3000');
}); // 此应用会监听3000端口