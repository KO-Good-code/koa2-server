import query from '../service/service';

const sql = {
  // 获取股票列表
  async DEPLOY_LIST(page:number, page_size:number = 10):Promise<any> {
    return query.query(`SELECT * FROM stock ORDER BY CAST(total AS SIGNED) DESC limit ${page_size * (page - 1)}, ${page_size}`)
  },
  // 获取股票列表
  async FUND_LIST(page:number, page_size:number = 10):Promise<any> {
    return query.query(`SELECT * FROM fund limit ${page_size * (page - 1)}, ${page_size}`)
  },
  // 增加关注股票
  async ADD_STOCK(value):Promise<any> {
    return query.query(
      `replace into stock (name, code, fundCode, fundName, time, total) VALUES ?`,
      [value]
    )
  },
  // 增加关注基金
  async ADD_FUND(value):Promise<any> {
    return query.query(
      `replace into fund (fundCode, fundName, stockCode, stockName, time) VALUES ?`,
      [value]
    )
  },
  //查询总数
  SELECT_COUNT: (table:string): Promise<any> => query.query(`select count(fundCode) as total from ${table}`),

  // 查询添加基金是否已存在
  async SELECT_FUNDCRAWLER(code:number):Promise<any> {
    return query.query(
      `select code from stock where find_in_set('${code}', fundCode);`
    )
  },
  // 判断股票是否已存在
  async SELECT_CODE(code: number):Promise<any> {
    return query.query(`select fundCode, fundName from stock where find_in_set('${code}', code);`)
  },
  // 修改股票数据
  async UPDATE_SOCK(fundName:string, fundCode:string, code:number, time:number, total:number):Promise<any> {
    return query.query(`UPDATE stock set fundName="${fundName}", fundCode="${fundCode}", time="${time}", total="${total}" where code=${code}`)
  },
  // 查询全部基金代码
  async SELECT_FUNDCODE():Promise<any> {
    return query.query(`select fundCode from fund;`)
  },
  // 删除所有数据
  async DELETE_FUNDCODE():Promise<any> {
    return query.query(`DELETE FROM stock;`)
  }
}

export default sql