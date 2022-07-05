

class Subject {
  constructor(name) {
    this.name = name;
    this.state = '好开心';
    this._arr = [];
  }

  attach(o) {
    this._arr.push(o);
  }

  setState(newState) {
    this.state = newState;
    this._arr.forEach(o => o.update(this));  // 通知观察者  被观察者的状态发生了改变
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  update(s) {
    console.log(this.name + ':' + s.name + s.state);
  }
}


const o1 = new Observer('father');
const o2 = new Observer('mother');

let s = new Subject('baby');

s.attach(o1);  // 订阅
s.attach(o2);  // 订阅

s.setState('好热啊');

// 观察者模式  当状态发生了改变的时候是不需要手动的更改状态的  

