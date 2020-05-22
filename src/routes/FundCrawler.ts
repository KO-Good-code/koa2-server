import sql from '../sql/fundCrawler.sql';
import { post, HttpError, CustomError, del, put, get } from '../middleware/decorator';
import * as Koa from 'koa';
const rp = require('request-promise'); //发送请求
const cheerio = require('cheerio'); //网页解析
const vm = require('vm');

//  基金爬虫
class fundCrawler {
  
  get api() {
    return '/fund';
  }

  @get('list')
  private async fund(ctx: Koa.Context) {
    const { code } = ctx.query;
    const time = new Date().getTime();
    const options = {
      url: `http://fundf10.eastmoney.com/FundArchivesDatas.aspx?type=jjcc&code=${code}&topline=10&_t=${time}`
    }
    const res = await rp(options);
    let apidata:any = {};
    vm.createContext(apidata);
    vm.runInContext(res, apidata);
    const $ = cheerio.load(apidata.apidata.content)
    let data:any[] = []
    const fundName = $('h4 a').text()
    $('tbody tr').each( (i, el) => {
      const children = $(el).children()
      // const r = {
      //   code: children.eq(1).text(), // 股票代码
      //   name: children.eq(2).text(), // 名称
      //   // newPrice: children.eq(3).text(), // 最新价
      //   // quoteChange: children.eq(4).text(), // 涨跌幅
      //   netWorth: children.eq(6).text(), // 占净值比例
      //   numberShare: children.eq(7).text(), // 持股数（万股）
      //   marketValue: children.eq(8).text(), //持仓市值 （万元）
      // }
      const r = [children.eq(2).text(), children.eq(1).text(), fundName, code, time]
      data.push(r)
    })
    console.log(data)
    await sql.ADD_STOCK(data)
    ctx.send(200)
  }

  // // 获取url对应网址内容，除utf-8外，需指定网页编码
  // fetch(url, coding, callback) {
  //   rp({url: url, encoding : null}, (error, response, body) => {
  //       let _body = coding==="utf-8" ? body : iconv.decode(body, coding);
  //       if (!error && response.statusCode === 200){
  //           // 将请求到的网页装载到jquery选择器中
  //           callback(null, cheerio.load('<body>'+_body+'</body>'));
  //       }else{
  //           callback(error, cheerio.load('<body></body>'));
  //       }
  //   });
  // }

}