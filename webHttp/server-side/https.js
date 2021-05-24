/**
 * How to generate a certificate signing request (CSR):
 * cmd: openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -nodes
 */ 
const fs = require('fs');

const server = require('https').createServer({
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
});

server.on('request', (req, res) => {
  res.writeHead(200, {
    'content-type': 'text/plain'
  });

  res.end('Hello world\n');
});

server.listen(443);