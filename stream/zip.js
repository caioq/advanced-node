const fs = require('fs');
const zlib = require('zlib');
const file = process.argv[2];

// alternative to show progress using transform stream instead of using data event
const {Transform} = require('stream');
const progress = new Transform({
  transform(chunk, encoding, callback) {
    process.stdout.write('.');
    callback(null, chunk);
  }
});

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(progress)
  // .on('data', () => process.stdout.write('.'))
  .pipe(fs.createWriteStream(file + '.zz'))
  .on('finish', () => console.log('Done'));
