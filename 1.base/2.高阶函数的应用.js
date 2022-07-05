
// 函数参数的预制  将函数的参数保留 (闭包)
// 闭包就是函数定义的作用域和执行的作用域不是同一个 此时就会产生闭包


// 函数的柯里化  偏函数都是基于高阶函数来实现的


// 判断数据类型有四种方式 
// typeof 可以判断基本数据类型  typeof null === 'object'
// instanceof 可以判断某个类型是否属于谁的实例
// Object.prototype.toString.call
// constructor  [].constructor  {}.constructor

/* function isType(typing,val) {
  return Object.prototype.toString.call(val) === `[object ${typing}]`
}

console.log(isType('Object', {})); */


function isType(typing) {
  return function (val) {
    return Object.prototype.toString.call(val) === `[object ${typing}]`
  }
}

let utils = {};

['Number', 'String', 'Boolean'].forEach(type => {
  utils[`is${type}`] = isType(type);
})

console.log(utils.isString('abc'));
console.log(utils.isNumber(1234));


