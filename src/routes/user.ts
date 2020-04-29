import sql from '../sql/user.sql';
import { post, HttpError, CustomError, del, put } from '../middleware/decorator';
import * as Koa from 'koa';
import token from '../config/token';

class user {
	get api() {
		return '/console';
	}

	// login user
	@post('login')
	private async login(ctx: Koa.Context) {
		let { username, passward } = <User>ctx.request.body;
		const res = await sql.FIND_ADMIN(username);
		if (res[0] && res[0].passward === passward) {
			let tk = token({ username, passward });
			ctx.send(tk, '登录成功');
		} else {
			throw new CustomError(401, '密码或用户名错误');
		}
	}

	//  add post
	@post('post')
	private async post(ctx: Koa.Context) {
		let { title, contant, tags } = <Post>ctx.request.body;
		let time = new Date().getTime();
		await sql.ADD_BLOG_POST(title, contant, tags, time);
		ctx.send(0, '操作成功');
	}

	// delete post
	@del('post')
	private async deletePost(ctx: Koa.Context) {
		try {
			let { post_id } = ctx.request.body;
			await sql.DEL_BLOG_POST(post_id);
			ctx.send(0, '操作成功');
		} catch (error) {
			throw new CustomError(201);
		}
	}

	//  update port
	@put('post')
	private async updatePost(ctx: Koa.Context) {
		try {
			let { title, contant, tags, id } = ctx.request.body;
			let time = new Date().getTime();
			await sql.UP_BLOG_POST({
				title,
				contant,
				tags,
				id,
				time
      });
      ctx.send(0, '操作成功');
		} catch (error) {
			throw new CustomError(201);
		}
	}
}

