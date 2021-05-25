// to test input a expression then press ctrl + D
const { exec } = require('child_process');

/**
 * exec is a good choice if you need to use the shell syntax and the data
 * returned from the command is not big, because exec will buffer the whole data
 * before it returns it.
 * 
 * spawn function is better choice if data returned from the command is big,
 * because that data will be streamed with the standard I/O object. 
 */ 
exec('find . -type f | wc -l', (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }

  console.log(`Number of files ${stdout}`);
})
