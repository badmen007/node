
//  promise 是干什么的，结局了什么问题？

// 1. 回调写起来不好看(难以维护) 恶魔金字塔 嵌套逻辑不优雅
// 2. 错误处理不统一  我们需要处理公共的错误逻辑
// 3. 简化回调 

// promise依旧是基于回调的 可能还是会有嵌套的问题

// 1.promise是一个构造函数，需要传入一个executor执行器
// 2.executor会立即执行，并且传入resolve 和 reject 两个参数
// 3.promise有三个状态 fulfilled 成功  reject失败  pending等待态(默认就是pending)
// 4.每一个promsie都有一个then方法，可以访问到成功的值和失败的原因
// 5.可以通过resolve和reject来改变状态，同时调用对应的回调，一个promise实例的状态发生改变之后, 那么它的状态就不能再发生改变
// 6.当extcutor发生异常的时候 也会触发promise的回调

const Promise = require('./promise');
let promise = new Promise((resolve, reject) => {
  resolve('ok');
})

promise.then(data => {
  console.log(data, 'success1');
}, reason => {
  console.log(reason, 'fail');
})


