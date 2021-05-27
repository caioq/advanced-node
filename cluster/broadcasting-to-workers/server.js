const http = require('http');
const pid = process.pid;

/**
 * To verify how many requests the server can handle per minute, use:
 * ApacheBent tool
 * This following command will load 200 concurren connections for 10 seconds
 * ab -c200 -t10 http://localhost:8080/
 */
let usersCount;

http.createServer((req, res) => {
  for (let i = 0; i < 1e7; i++); // simulate CPU work before responding
    res.write(`Handled by process ${pid}\n`)
    res.end(`Users: ${usersCount}`)
}).listen(8080, () => {
  console.log(`Started process ${pid}`)
});

process.on('message', msg => {
  // console.log(`Message from master: ${msg}`);

  usersCount = msg.usersCount;
})

