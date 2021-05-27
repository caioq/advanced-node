const fs = require('fs');

function fileSize (fileName, cb) {
  if (typeof fileName !== 'string') {
    // new TypeError('argument should be string');
    /** We use nextTick to avoid a function call the callback both sync and async */
    return process.nextTick(
      cb,
      new TypeError('argument should be string')
    );
  }

  fs.stat(fileName, (err, stats) => {
    if (err) {
      return cb(err);
    }

    cb(null, stats.size);
  });
}

// fileSize('setImmediate.js', (err, size) => {
fileSize(1, (err, size) => {
  if (err) throw err;

  console.log(`Size in KB: ${size/1024}`);
});

console.log('Hello!');