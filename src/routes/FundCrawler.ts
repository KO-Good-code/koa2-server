import sql from '../sql/fundCrawler.sql';
import { post, HttpError, CustomError, del, put, get } from '../middleware/decorator';
import * as Koa from 'koa';
const rp = require('request-promise'); //发送请求
const cheerio = require('cheerio'); //网页解析
const vm = require('vm');

// 判断某只基金是否已记录 code 基金代码
const isFundCode = async (code:number) => (await sql.SELECT_FUNDCRAWLER(code)).length > 0;

// 判断某只股票是否已记录 code 股票代码
const isStock = async (code:number) => await sql.SELECT_CODE(code);

// 爬取基金持仓数据
const fundCodeData = async (code: number) => {
  const options = {
    url: `http://fundf10.eastmoney.com/FundArchivesDatas.aspx?type=jjcc&code=${code}&topline=10&year=&month=&rt=0.7134567067495656&_t=${new Date().getTime()}`
  }
  const res = await rp(options);
  let apidata:any = {};
  vm.createContext(apidata);
  vm.runInContext(res, apidata);
  return apidata.apidata.content;
}

// 处理封装基金持仓数据  以股票为主
const dealFundCodeData = async (code: number) => {
  const time = new Date().getTime();
  const content = await fundCodeData(code)
  const $ = cheerio.load(content)
  
  let fundCodeStockCode:any[] = [];
  let fundCodeStockName:any[] = [];
  let stockData:any[] = [];
  const fundName = $('h4 a').text();
  const tbody = $('tbody tr');
  for(let i = 0;i < tbody.length; i++) {
    const children = $(tbody[i]).children();
    const stockCode = children.eq(1).text(); // 股票代码
    const stockName = children.eq(2).text(); // 名称
    const isCodes = await isStock(stockCode);
    fundCodeStockCode.push(stockCode);
    fundCodeStockName.push(stockName);
    if(isCodes.length > 0) {
      const newStockName = `${isCodes[0].fundName},${fundName}`
      const newStockCode = `${isCodes[0].fundCode},${code}`
      const total = newStockCode.split(',').length;
      await sql.UPDATE_SOCK(newStockName, newStockCode, stockCode, time, total)
    } else {
      const r = [stockName, stockCode, code, fundName,  time, 1]
      stockData.push(r)
    }
  }
  const fundData:any[] = [code, fundName, fundCodeStockCode.join(','), fundCodeStockName.join(','), time];
  return {stockData, fundData};
}

// 更新基金数据
const UpdateFundCodeData = async (code:number) => {
  const time = new Date().getTime();
  const content = await fundCodeData(code)
  const $ = cheerio.load(content);
  let fundCodeStockCode:any[] = [];
  let fundCodeStockName:any[] = [];
  let stockData:any[] = [];
  const fundName = $('h4 a').text();
  const tbody = $('tbody tr');
  for(let i = 0;i < tbody.length; i++) {
    const children = $(tbody[i]).children();
    const stockCode = children.eq(1).text(); // 股票代码
    const stockName = children.eq(2).text(); // 名称
    fundCodeStockCode.push(stockCode);
    fundCodeStockName.push(stockName);
    stockData.push({
      stockCode,
      stockName,
      fundCode: code,
      fundName
    })
  }
  const fundData:any[] = [code, fundName, fundCodeStockCode.join(','), fundCodeStockName.join(','), time];

  return {stockData ,fundData};
}
//  基金爬虫
class fundCrawler {
  
  get api() {
    return '/fund';
  }

  // 添加新的关注基金
  @post('fundCode')
  private async fund(ctx: Koa.Context) {
    const { code } = ctx.request.body;
    // 判断基金是否存在
    const isCode = await isFundCode(code);

    if(isCode) {
      throw new CustomError(201, '基金重复');
    }

    const { stockData, fundData } = await dealFundCodeData(code);
    // const r = {
    //   code: children.eq(1).text(), // 股票代码
    //   name: children.eq(2).text(), // 名称
    //   // newPrice: children.eq(3).text(), // 最新价
    //   // quoteChange: children.eq(4).text(), // 涨跌幅
    //   netWorth: children.eq(6).text(), // 占净值比例
    //   numberShare: children.eq(7).text(), // 持股数（万股）
    //   marketValue: children.eq(8).text(), //持仓市值 （万元）
    // }
    await sql.ADD_FUND([fundData])
    if(stockData.length > 0) {
      await sql.ADD_STOCK(stockData)
    }
    ctx.send(200)
  }
  /**
   * 获取基金数据列表
   * @param {number} page 页数
   * @param {number} page_size 页码
   * @param {number} type 1 股票数据 2 基金数据
   * */ 
  @get('fundList')
  private async fundList(ctx: Koa.Context) {
    const { page, page_size, type } = ctx.query;
    let data = {}, total;
    if( type == 1) {
      data = await sql.DEPLOY_LIST(page, page_size);
      total = await sql.SELECT_COUNT('stock')
    } else {
      data = await sql.FUND_LIST(page, page_size);
      total = await sql.SELECT_COUNT('fund')
    }
    
    ctx.send({
      list: data,
      total: total[0].total
    })
  }

  // 更新基金最新数据
  @put('fundList')
  private async newFundList(ctx: Koa.Context) {
    const time = new Date().getTime()
    const res = await sql.SELECT_FUNDCODE();
    const fundCodeList = res.map( i => i.fundCode.split(',')).reduce((i, t) => [...new Set([...i, ...t])]);
    let stock:any[] = [], fund:any[] = [];
    // await sql.DELETE_FUNDCODE();
    // 数组循环里使用async await 有问题 需了解
    for(let i = 0; i < fundCodeList.length; i++) {
      const { stockData, fundData } = await UpdateFundCodeData(fundCodeList[i]);
      stock = stock.concat(stockData)
      fund.push(fundData)
    }
    let newStock = {};
    // 将基金里面的股票抽出处理
    stock.forEach( i => {
      if(newStock[i.stockCode]) {
        const old = newStock[i.stockCode]
        newStock[i.stockCode] = {
          fundCode: `${old.fundCode},${i.fundCode}`,
          fundName: `${old.fundName},${i.fundName}`,
          stockName: i.stockName,
          stockCode: i.stockCode
        };
      }else {
        newStock[i.stockCode] = i;
      }
    });
    
    // 将抽离的股票数据转为数据库存储格式
    stock = Object.values(newStock).map( (i:any) => {
      const { stockName, stockCode, fundCode, fundName } = i;
      const total = fundCode.split(',').length
      return [ stockName, stockCode, fundCode, fundName, time, total ]
    })
    await sql.ADD_STOCK(stock)
    await sql.ADD_FUND(fund)
    ctx.send(200)
  }

}