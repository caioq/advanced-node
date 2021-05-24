/**
    TASK 1:
    Script to fix files in a directory.
    Each file has its data duplicated.
    Truncate each file in half
 * 
 */

const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'files');

const files = fs.readdirSync(dirname);

files.forEach(file => {
  // use path module to concat string paths file to be platfotm agnostic
  const filePath = path.join(dirname, file);
  fs.stat(filePath, (err, stats) => {
    if (err) throw err;

    fs.truncate(filePath, stats.size/2, (err) => {
      if (err) throw err;
    })
  })
})
  