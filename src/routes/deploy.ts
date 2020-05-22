import sql from '../sql/deploy.sql';
import { post, HttpError, CustomError, del, put, get } from '../middleware/decorator';
import * as Koa from 'koa';
import { runShell } from '../config/tools';
//  后台自动化部署
class jekins{

  get api() {
		return '/deploy';
  }
  // 项目列表数据
  @get('list')
  private async getList(ctx: Koa.Context) {
    const { page } = ctx.query;
    const data = await sql.DEPLOY_LIST(page);
    ctx.send(data);
  }
  // 打包项目
  @post('project')
  private async postProject(ctx: Koa.Context) {
    const { id } = ctx.request.body;
    const res = await sql.POST_DEPLOY_PROJECT(id);
    const data = res[0];
    const path = `${data.path}/demo`
    const gitClone = `git clone ${data.github}  ${path}`;
    // 下载github
    await runShell('', gitClone);
    const cmd = `yarn`
    // 安装依赖
    await runShell(path, cmd);
    // 执行打包命令
    await new Promise((resolve, reject) => {
      setTimeout(async() => {
        try {
          const { stdout, stderr } = await runShell(path, data.shell); 
          if(stdout) {
            resolve(stdout)
          }else {
            new CustomError(stderr)
          }
          } catch (error) {
            reject(error)
          }
      }, 100)
    });
    // 移动打包内容到指定目录
    await runShell(data.path, `cp -avx demo/dist/* ./`);
    // 删除多余内容
    await runShell(data.path, `rm -r ./demo`);

    ctx.send('操作成功');
  }

  // 获取打包项目配置
  @post('projectConfig')
  private async projectConfig(ctx: Koa.Context) {
    const data = ctx.request.body;
    await sql.ADD_CONFIG(data);
    ctx.send('操作成功')
  }
  // 修改打包配置
  @put('projectConfig')
  private async updateProjectConfig(ctx: Koa.Context) {
    const time = new Date().getTime();
    const { id, path, name, url, github, shell } = ctx.request.body;
    await sql.UPDATA_CONFIG({
      id,
      name,
      path,
      url,
      github,
      shell,
      time,
    });
    ctx.send('操作成功');
  }
  
}