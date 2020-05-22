import query from '../service/service';

const sql = {
  // 获取项目列表
  async DEPLOY_LIST(...arg):Promise<any> {
    return query.query(`SELECT * FROM project limit ${8 * (arg[0] - 1)}, 8`)
  },
  // 增加关注基金
  async ADD_STOCK(value):Promise<any> {
    return query.query(
      `insert into stock (name, code, fundCode, fundName, time) VALUES ?`,
      [value]
    )
  },
  // 增加打包配置
  async ADD_CONFIG({id, path, name, url, github, shell, time, version}):Promise<any> {
    return query.query(
      `insert into project (id, path, name, url, github, time, shell, version) 
      values ("${id}", "${path}", "${name}", "${url}", "${github}", "${time}", "${shell}", "${version}")`
    )
  },
  // 获取打包配置
  async UPDATA_CONFIG({id, path, name, url, github, shell, time}):Promise<any> {
    return query.query(`UPDATE project set path="${path}", name="${name}", time="${time}", url="${url}", github="${github}", shell="${shell}" where id=${id}`)
  },
}

export default sql