
const fs = require('fs/promises');
const path = require('path');


function * readFile() {
  const data1 = yield fs.readFile(path.resolve(__dirname, '../a.txt'),'utf8');
  const data2 = yield fs.readFile(path.resolve(__dirname, `../${data1}`));
  return data2;
}



function co(it) {
  return new Promise((resolve, reject) => {
    function step(data) {
      const {value, done} = it.next(data);
      if(!done) {
        Promise.resolve(value).then(data => { // 为什么要在这里用Promise.resovle()包裹呢
          step(data);
        }).catch(err => {
          reject(err);
        })
      }else{
        resolve(value);
      }
    }
    step();
  })
}

co(readFile()).then(data => {
  console.log(data.toString());
}).catch(e => {
  console.log(e);
})