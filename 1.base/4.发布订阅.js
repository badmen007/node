
const fs = require('fs');
const path = require('path');

const events = {
  _obj: {},
  _arr: [],
  on(callback) {
    this._arr.push(callback);
  },
  emit(key, value) {
    this._obj[key] = value;
    this._arr.forEach(cb => cb(this._obj));
  }
}

events.on(() => {
  console.log('读取完毕后触发')
})

events.on(data => {
  if(Reflect.ownKeys(data).length === 2) {
    console.log('数据读取完毕', data);
  }
})


fs.readFile(path.resolve(__dirname, 'a.txt'), 'utf8', function(err, data) { 
  events.emit('a', data);
})

fs.readFile(path.resolve(__dirname, 'b.txt'), 'utf8', function(err, data) {
  events.emit('b', data);
})

// 发布订阅不好的点在于 需要自己去发布