
const util = require('util');
const exec = util.promisify(require('child_process').exec);
// const path = require('path');
// const glob = require('glob');
// const fs = require('fs');
// const rm = require('rimraf').sync;

/**
 * @param {string} url 运行命令的目录
 * @param {string} shell  运行的命令
*/
export const runShell = async (url:string, shell:string):Promise<any> => {
  const { stdout, stderr } =  await exec(shell, { cwd: url, timeout: 20000, stdio: 'inherit'})
  return {
    stdout,
    stderr
  }
}

/*
 * ! @fileName 文件路径名
 *  判断是否文件夹
 */

// const inspectFileType = async (fileName) => {
//   let result;
//   fs.stat(fileName, (err, stats) => {
//     if (err) {
//       return
//     }
//     result = stats && stats.isDirectory()
//   })
//   return result
// }

// /**
//  * @param {string} name 项目名称
//  * 
//  * @public  判断项目是否存在
//  * */
// export const inspectName = async (name:string, rootPath:string) => {
//   const list = glob.sync('*')
//   let rootName = path.basename(rootPath)
//   if (list.length) {
//     let fileName = path.resolve(rootPath, path.join('.', name))
//     const isDir = inspectFileType(fileName) && list.includes(name)
//     if (isDir) {
//       rm(fileName)
//     }
//     rootName = name
//   } else if (rootName === name) {
//     rootName = '.'
//   } else {
//     rootName = name
//   }
//   return rootName
// }