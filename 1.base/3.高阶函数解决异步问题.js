const fs = require('fs');
const path = require('path');


function after(times, cb) {
  let obj = {};
  return function(key, value) {
    obj[key] = value;
    if(--times === 0) {
      cb(obj);
    }
  }
}

const cb = after(2, data => {
  console.log(data);
})


fs.readFile(path.resolve(__dirname, 'a.txt'), 'utf8', function(err, data) { 
  cb('a', data);
})

fs.readFile(path.resolve(__dirname, 'b.txt'), 'utf8', function(err, data) {
  cb('b', data);
})