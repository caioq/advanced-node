// UDP Protocol: 
const dgram = require('dgram');
const PORT = 3333;
const HOST = '127.0.0.1';

// SERVER
const server = dgram.createSocket('udp4');

server.on('listening', () => console.log('UDP Server listening'));

// emits when receive a message
server.on('message', (msg, rinfo) => {
  // each message is sent in a different rinfo.port
  console.log(`${rinfo.address}:${rinfo.port} - ${msg}`)
});

server.bind(PORT, HOST);

// CLIENT
const client = dgram.createSocket('udp4');

// message can be string or buffer
const msgString = 'Rocks!';
// its possible to specify an offset when is buffer is used
const msgBuffer = Buffer.from('UDP Rocks with buffer!'); 

client.send(msgBuffer, 0, msgBuffer.length, PORT, HOST, (err) => {
  if (err) throw err;

  console.log('UDP message sent');
  // client.send(msgBuffer, msgBuffer.length/2, 4, PORT, HOST, (err) => {
  //   if (err) throw err;
  
  //   console.log('UDP message sent');
  //   client.close();
  // });
  client.close();
});