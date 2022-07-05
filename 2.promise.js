const fs = require('fs');
const path = require('path');
const { promisify } = require('util');


/* function readFile(filePath) {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', funciton(err, data) {
      if(err) return reject(err);
      resolve(data);
    })
  })
  return promise
} */

/* function promisify(fn) {
  return function(...args) {
    const promise = new Promise((resolve, reject) => {
      fn(...args, function(err, data) {
        if(err) return reject(err);
        resolve(data);
      })
    })
    return promise;
  }
} */


let readFile = promisify(fs.readFile);

// 1.then链的特点，当then中成功和失败的回调函数返回的是一个promise,内部会解析这个promise,并且将结果传递到外层的下一个then 中
// 2.下一次then走成功还是失败，取决于当前的promise状态 成功就走成功  失败就走失败
// 3.如果成功或者失败返回的不是一个promise, return 的值将传递到下一个then的成功中, 如果没有return的话 下一个then中的值就是undefined
// 4.如果成功或者失败的回调中抛出异常，那么异常将会走到下一个then的失败中

// 让一个promise抛出异常的方式  抛出错误 或者是 返回一个失败的promise

readFile(path.resolve(__dirname, 'a.txt'), 'utf8').then(data => {
  return readFile(data, 'utf8');   // 这里因为return的是一个promise所以会解析这个promise将结果传递到下一个then中
}).then(data => {
  console.log(data, 'success');
}, err => {
  console.log(err, 'fail');
  return true;
}).then(data => {
  console.log(data, 'success');
  throw new Error('出错')
}).then(() => {}, err => {
  console.log(err);
})


