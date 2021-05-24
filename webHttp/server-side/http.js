/**
 * - Application Layer
 * - HTTP is stateless, one way communication, while oh the order hand TCP is 3 way handshake(SYN, SYN-ACK and ACK)
 * - HTTP establishes data link communication only but TCP establishes session connection.
 */

// creates an event emitter object
// server: http.Server
const server = require('http').createServer();

// server has request event, emitted when client connects to this http server
// test using: curl -i localhost:8000
server.on('request', (req, res) => {
  // req: http.IncomingMessage
  // res: http.ServerResponse
  res.writeHead(200, {
    'content-type': 'text/plain'
  });

  res.write('Hello world\n');

  setTimeout(function() {
    res.write('Another Hello world after 2 second');
  }, 200);

  setTimeout(() => {
    res.write('Another Hello world after 10 seconds');
  }, 10000);

  setTimeout(() => {
    res.write('Not gonna happen because of server timeout');
  }, 130000);

  // the end method is not optional, you have to do it for every request. If you dont, the requst will timeout after the default timeout period
  // res.end('End of request\n');
});

server.timeout = 11000;
server.listen(8000);