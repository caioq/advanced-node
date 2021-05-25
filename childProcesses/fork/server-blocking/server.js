const http = require('http');
const { fork } = require('child_process');

// const longComputation = () => {
//   let sum = 0;

//   for (let i = 0; i < 1e10; i++) {
//     sum += i;
//   };
//   return sum;
// }

const server = http.createServer();

server.on('request', (req, res) => {
  if (req.url === '/compute') {

    // const sum = longComputation(); // the request blocks the node server because of long loop blocking the event loop
    // return res.end(`Sum is ${sum}`);

    // way to non block the server
    const compute = fork('compute.js');
    compute.send('start');
    compute.on('message', sum => {
      res.end(`Sum is ${sum}`);
    });
  } else {
    res.end('Ok')
  }
});

server.listen(3000);