// Asynchronous code with right sequence of events
const fs = require('fs');
const EventEmitter = require('events');

class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    console.time('execute');
    this.emit('begin');
    asyncFunc(...args, (err, data) => {
      if(err) {
        return this.emit('error', err);
      }

      this.emit('data', data);
      console.timeEnd('execute');
      this.emit('end');
    });
  }
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

withTime.on('data', (data) => {
  console.log(`Length: ${data.length}`)
});

// error event
// withTime.on('error', console.error);
// another way to right error event - practical use case: use process.once, because multiple errors could be triggered
process.once('uncaughtException', (err) => {
  console.log(err);
  // do some cleanup
  process.exit(1);
});

// error path
withTime.execute(fs.readFile, '');
// sucess path
withTime.execute(fs.readFile, __filename);

