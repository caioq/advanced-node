const fs = require('fs');
const server = require('http').createServer();

/**
 * Linux commands:
 * List PID, process and ports:  lsof -i -P -n
 * Monitor process: top -p PID
 */

server.on('request', (req, res) => {
  // load all data at once -> more consuming memory
  // fs.readFile('./big.file', (err, data) => {
  //   if (err) throw err;

  //   res.end(data);
  // })

  // load chunks of data -> limited memory consuming
  const src = fs.createReadStream('./big.file');
  src.pipe(res);
});

server.listen(8000);