const fs = require('fs');

fs.readFile(__filename, () => {
  console.log('log teste start');

  setTimeout(() => {
    console.log('timeout');
  }, 0); // minimum time of execution
  
  process.nextTick(() => {
    console.log('next tick 1')
  })
  
  setImmediate(() => {
    console.log('immediate');
  });
  
  process.nextTick(() => {
    console.log('next tick 2')
  })

  console.log('log teste end');
})