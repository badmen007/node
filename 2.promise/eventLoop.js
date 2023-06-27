

// 什么是进程？
// 进程是系统进行分配资源的最小单位，进程是由操作系统进行资源分配和调度的基本单位，是操作系统结构的基础。
// 每个进程都是独立的，但是每个进程可以互相通信

// 浏览器就是一个多进程模型， 对于浏览器而言，每一个页签就是一个进程，每个进程都是独立的，互不影响

// 什么是线程？
// 线程是进程的一个执行单元，是CPU调度和分派的基本单位，一个进程可以由很多个线程组成，线程间共享进程的所有资源，每个线程有自己的堆栈和局部变量。
// js 是单线程的？ 为什么是单线程的？
// js引擎是单线程的
// 网络线程：负责网络请求，如ajax请求，websocket请求等
// 事件触发线程：负责事件轮询，如鼠标点击，键盘点击，定时器等
//
// Event Loop 事件循环
// 任务也是具备优先级的
// 宏任务：包括整体代码script，setTimeout，setInterval ui渲染，I/O，setImmediate
// 微任务：Promise，process.nextTick MutationObserver queueMicrotask 
//
// 默认会拿出一个宏任务执行，宏任务执行的时候会产生微任务，宏任务执行完毕后会清空微任务队列，然后再执行下一个宏任务，执行一个宏任务，执行多个微任务

// 1. 先执行宏任务，执行完毕后清空微任务队列
// 2. 再执行宏任务，执行完毕后清空微任务队列
//
// requestAnimationFrame requestIdleCallback 和浏览器渲染相关的钩子