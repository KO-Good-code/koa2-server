import * as Koa from 'koa';
import router, { load, errorMiddleware } from './middleware/decorator';
import * as bodyParser from 'koa-bodyparser';
import * as json from 'koa-json';
import * as jwt from 'koa-jwt';
const cors = require('koa-cors')
// import { integrateGraphql } from './graphql';

const app = new Koa();

/**
 * @param {Koa} app 服务实例
 * @param {api接口模式为Graphql}
 */

// integrateGraphql(app).then((server) => {

// 	app.use(errorMiddleware());

// 	app.use(
// 		bodyParser({
// 			enableTypes: [ 'json', 'form', 'text', 'formdata' ]
// 		})
// 	);

// 	app.use(json());

// 	// app.use(
// 	//   jwt({
// 	//     secret: 'mytoken'
// 	//   }).unless({
// 	//     path: [/^\/api\/home/,/^\/api\/post/,/^\/api\/tags/,/^\/api\/archive/,/^\/console\/login/]
// 	//   })
// 	// )

// 	app.use(router.routes()); // 加载路由

// 	app.listen(3000, '127.0.0.1' ,() => {
// 		console.log(`server running success at http://127.0.0.1:3000${server.graphqlPath}`);
// 	}); // 此应用会监听3000端口
// });


/**
 * @param {RESTful风格 API}
*/

load('routes');

app.use(errorMiddleware());

app.use(cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'DELETE','OPTIONS'],
}))

	app.use(
		bodyParser({
			enableTypes: [ 'json', 'form', 'text', 'formdata' ]
		})
	);

	app.use(json());

	// app.use(
	//   jwt({
	//     secret: 'mytoken'
	//   }).unless({
	//     path: [/^\/api\/home/,/^\/api\/post/,/^\/api\/tags/,/^\/api\/archive/,/^\/console\/login/]
	//   })
	// )

	app.use(router.routes()); // 加载路由

	app.listen(8000, '127.0.0.1' ,() => {
		console.log(`server running success at http://127.0.0.1:8000`);
	}); // 此应用会监听3000端口
