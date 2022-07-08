// 优点: 链式调用，提供了一些常用的api如catch Promise.all() Promise.race() 

// es6中提供了 generator函数(生成器) 生成的迭代器 我们可以利用generator来简化异步编程async + await 就是generator演化来的

// generator 是一种语法， 可以让我们的异步代码 写的更像同步代码

function* fn() { // es6并没有规定这个*的位置  所以怎么写都行的
  yield 'hello';
  yield 'world'
}

let iterator = fn();
console.log(iterator.next());  // { value: 'hello', done: false }
console.log(iterator.next());  // { value: 'world', done: false }
console.log(iterator.next());  // { value: undefined, done: true }


// 如果有return的值的话 那么返回的就是return后面表达式的值  如果没有return的话 那就是value就是undefined

/* 
next方法的运行逻辑如下
1.遇到yeild就暂停执行后面的操作(就是yeild后面的语句), 将紧跟在yield后面的表达式的值作为返回对象的value属性的值
2.下一次调用next方法就再往下执行，直到遇到下一个yield
3.如果没有遇到yield就一直运行到函数结束，直到遇到return语句为止，并将return后面的表达式的值作为返回对象的value属性的值
4.如果没有return语句，则返回对象的value属性的值为undefined
*/



// 什么是元编程啊? 
// 有iterator接口就能被...运算符遍历

let likeArray = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  length: 4,
  // [Symbol.iterator]: function*() {
  //   let i = 0; 
  //   let len = this.length;
  //   while(len !== i) {
  //     yield this[i++];
  //   }
  // }
  [Symbol.iterator]: function*() {
    yield 1;
    yield 2;
    yield 3;
  }
}

let arr = [...likeArray]; // 就是...操作符能够去调用迭代器
console.log(arr);

