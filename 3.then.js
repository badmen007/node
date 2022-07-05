const fs = require('fs');
const path = require('path');
const Promise = require('./promise');

const promise = new Promise((resolve, reject) => {
  resolve('ok')
})


let promise2 = promise.then(data => {
  // return promise2;
  return new Promise((resolve, reject) => { 
    setTimeout(()=>{
      resolve(new Promise((resolve,reject)=>{ // 这里理解的不是很明白
          setTimeout(()=>{
              resolve('ok')
          },1000)
      }))
  },1000)
  })
})

promise2.then(data => {
  console.log(data, 'success');
}, err => {
  console.log(err);
})