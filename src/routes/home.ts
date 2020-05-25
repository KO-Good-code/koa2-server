import sql from '../sql/home.sql';
import { get, HttpError, CustomError } from '../middleware/decorator';
import * as Koa from 'koa';

class home {
	get api() {
		return '/api';
	}

	//  获取首页列表
	@get('home')
	public async user(ctx: Koa.Context) {
		try {
			let { pageSize } = ctx.query;
			const res: homeList[] = await sql.SELECT_LIST(pageSize);
			let result: homeList[] = res.map((i) => {
				typeof i.tags == 'string' && i.tags.split(',');
				return i;
			});
			ctx.send(result);
		} catch (error) {
			throw new HttpError(500);
		}
	}

	// 获取帖子详情
	@get('post')
	private async post(ctx: Koa.Context) {
    let { post_id } = ctx.query;
		if (!post_id || parseFloat(post_id).toString() == 'NaN') {
			throw new CustomError(400);
		}
		const result: Post[] = await sql.SELECT_CONTANT(post_id);
		ctx.send(result[0]);
	}

	// 获取标签页
	@get('tags')
	private async tags(ctx: Koa.Context) {
		const res = await sql.FIND_TAGS(); //获取标签 title
		let result = {};
		res.map((res) => {
			let r = res.tags;
			if (!result.hasOwnProperty(r)) {
				result[r] = [];
			}
			let obj = res;
			result[r].push(obj);
		});
		ctx.send(result);
	}

  // 时间线
	@get('archive')
	private async archive(ctx: Koa.Context) {
		const res = await sql.FIND_ALL_TIME();
		let result = {};
		res.map((o) => {
			let r = new Date(o.time).getFullYear();
			if (!result.hasOwnProperty(r)) {
				result[r] = [];
			}
			result[r].push(o);
		});
		ctx.send(result);
	}
}
