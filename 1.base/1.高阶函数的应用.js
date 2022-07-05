
// 1. 什么是高阶函数？ 
// 一个函数返回一个函数那就是高阶函数
// 一个函数的参数是函数那就是高阶函数


function core(a, b, c) {
  console.log('核心', a, b, c);
}

Function.prototype.before = function(cb) {
  return (...args) => {
    cb();
    this(...args);
  }
}

let newCore = core.before(function() {
  console.log('before');
})

newCore(1, 2, 3);
