// Asynchronous code with right sequence of events
const fs = require('fs');
const EventEmitter = require('events');

class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    console.time('execute');
    asyncFunc(...args, (err, data) => {
      if(err) {
        return this.emit('error', err);
      }

      this.emit('data', data);
      console.timeEnd('execute');
    });
  }
}

const withTime = new WithTime();

withTime.on('data', (data) => {
  console.log(`Length: ${data.length}`)
});

withTime.on('data', (data) => {
  console.log(`Characters: ${data.toString().length}`)
});

// if have a need to define a new listener, and that listener have to be invoked first, you can use the prepend listener
withTime.prependListener('data', (data) => {
  console.log(`First call, Characters: ${data.toString().length}`)
});

// sucess path
withTime.execute(fs.readFile, __filename);

