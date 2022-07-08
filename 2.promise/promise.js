
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';


function resolvePromise(promise2, x, resolve, reject) {
  // 这个方法处理的会严谨一些，保证所有人的promise 都可以互相调用

  // If promise and x refer to the same object, reject promise with a TypeError as the reason.
  // 如果x 和 promise2 引用的是同一个对象，那么promise2 要等待x执行完毕
  // x是一个promise，而且永远不会成功和失败，那么就会在这里等待
  if (x === promise2)
    return reject(new TypeError("Chaining cycle detected for promise"));

  // 我如何知道x是不是promise
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    // 有可能是promise
    // Let then be x.then
    let called = false;
    try {
      let then = x.then; // then方法可能是通过defineProperty来进行定义的
      if (typeof then === "function") {
        // 是promise  {then:function(){}}
        then.call(
          x,
          (y) => {
            // x.then
            // 为了防止promise解析后的结果依旧是promise，所以需要递归解析
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        // 就是一个对象或者函数  {a:1}  function(){}
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x); // 普通值 直接将结果传递到下面就可以了
  }
}

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {

      if (value instanceof Promise) {
        // 递归解析的流程
        return value.then(resolve, reject);
      }

      if(this.status === PENDING) {
        this.value = value;
        this.status = FULFILLED;

        this.onResolvedCallbacks.forEach(cb => cb());
      }
    }

    const reject = (reason) => {
      if(this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
        
        this.onRejectedCallbacks.forEach(cb => cb());
      }
    }

    try{
      executor(resolve, reject);
    }catch(e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected = typeof onRejected === 'function' ? onRejected : (e) => { throw e;}
    let promise2 = new Promise((resolve, reject) => {
      if(this.status === FULFILLED) {
        setTimeout(() => {
          try{
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          }catch(e) {
            reject(e);
          }
        })
      }
  
      if(this.status === REJECTED) {
        setTimeout(() => {
          try{
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          }catch(e) {
            reject(e)
          }
        })
      };
  
      if(this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try{
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            }catch(e) {
              reject(e);
            }
          })
        })
  
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try{
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            }catch(e) {
              reject(e);
            }
          })
        })
      }
    })
    return promise2;
  }

  
  catch(errCallback) {
    return this.then(null, errCallback);
  }

  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value);
    })
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    })
  }

  static all(values) {
    let count = 0;
    let arr = [];
    function processData(index, data) {
      arr[index] = data;
      if(++count == values.length) {
        resolve(arr);
      }
    }

    for(let i = 0; i < values.length; i++) {
      let curr = values[i];
      Promise.resolve(curr).then(data => {  // 将普通的值包装成promise
        processData(i, data);
      },reject);
    }
  }

  static race(values) {
    return new Promise((resolve, reject) => {
      for(let i = 0; i < values.length; i++) {
        Promise.resolve(values[i]).then(resovle, reject);
      }
    })
  }
  

}

Promise.deferred = function () {
  // deferred  all race catch ...
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

module.exports = Promise;