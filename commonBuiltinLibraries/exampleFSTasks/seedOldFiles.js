/**
    TASK 2:
    Script to clean old files in a directory.
    Anything older than 7 days should be deleted.
 * 
 */

const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'files');

// Seed
// create destination diretory to work with
fs.mkdirSync(dirname);
const ms1Day = 24*60*60*1000;

for (let i=0; i < 10; i++) {
  const filePath = path.join(dirname, `files${i}`);
  fs.writeFile(filePath, i, (err) => {
    if (err) throw err;

    const time = (Date.now() - i*ms1Day)/1000;
    fs.utimes(filePath, time, time, (err) => {
      if (err) throw err;
    })
  })
}
      