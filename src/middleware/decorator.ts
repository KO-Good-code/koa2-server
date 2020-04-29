import * as Router from 'koa-router';
import { ERROR_MSG, HTTP_CODE } from '../config/error'
const glob = require('glob');
const paths = require('path');
const router = new Router(); // 新建一个路由

/**
 * @param {String} path 请求路径 
 */
const Route = (Route) => (method:string) => (path: string) => {
  return function(target, key:string, descriptor:PropertyDescriptor) {
    const api = target?.api || '';
    const fn = descriptor.value;
    Route[method](`${api}/${path}`, fn)
  }
}

/**
 * @param {String} file 文件夹目录 
 */
export const load = (file:string) => {
  const url = paths.resolve(__dirname, `../${file}`)
  const arr = glob.sync(`${url}/*`);
  arr.forEach(i => {
    require(i)
  });
}

/**
 * 错误信息处理
 * @param {number} code 错误值 
 * @param {string} msg 错误信息
*/

export function CustomError (this, code:number, msg?:string) {
  Error.call(this, '');
  this.code = code;
  this.msg = msg || ERROR_MSG[code] || 'unknown error';
  this.getCodeMag = () => ({
    code: this.code,
    msg: this.msg
  })
}

/**
 * 抛出http相关错误
*/
export function HttpError (this, code: number, msg?: string) {
  if(Object.values(HTTP_CODE).indexOf(code) < 0) {
    throw Error('not an invalid http code')
  }
  CustomError.call(this, code, msg)
}

// 请求处理中间件
export const errorMiddleware = () => {
  //  请求成功
  const render = (ctx) => {
    return (data, msg?:string) => {
      ctx.body = {
        code: 200,
        data: data,
        msg: msg || '请求成功'
      }
    }
  }

  return async (ctx, next) => {
    try {
      ctx.send = render(ctx)
      await next()
    } catch (error) {
      if( error.status === 401 ) {
        ctx.body = {
          code: -1,
          msg: 'token已过期'
        }
        return;
      }
      let err:Err = error
      let code = 500;
      let msg = '服务端出错';
      if (err instanceof CustomError || err instanceof HttpError) {
        const res = err.getCodeMag();
        ctx.status = err instanceof HttpError ? res.code : 200;
        code = res.code;
        msg = res.msg;
      } else {
        code = error.status;
        msg = error.originalError ? error.originalError.message : error.message
      }
      ctx.body = {
        code,
        msg
      }
    }
  }
}

const createRouteApi = Route(router)
export const get = createRouteApi('get')
export const post = createRouteApi('post')
export const del = createRouteApi('delete')
export const put = createRouteApi('put')

export default router