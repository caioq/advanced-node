// test: to connect a client to this server use: nc localhost 8000

process.stdout.write('\u001B[2J\u001B[0;0f');

const server = require('net').createServer();
let counter = 0;
let sockets = {};

function timestamp() {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}`;
}

/*
server object is an event emitter that 
emits a connection every time a client connects to it
*/
server.on('connection', socket => {
  socket.id = counter++;

  console.log('Client connected');
  socket.write('Please type your name: \n');


  // socket is also eventEmitter it emits dataEvent
  socket.on('data', data => {
    if (!sockets[socket.id]) {
      socket.name = data.toString().trim();
      socket.write(`Welcome ${socket.name}!\n`);
      sockets[socket.id] = socket;
      return;
    }

    Object.entries(sockets).forEach(([key, clientSocket]) => {
      if(socket.id == key) return;
      clientSocket.write(`${socket.name} ${timestamp()}: `);
      clientSocket.write(data);
    });
    
  });

  socket.on('end', () => {
    delete sockets[socket.id];
    console.log('Client disconnected');
  });

  // data transfered is buffer by default
  // socket.setEncoding('utf8');
});

server.listen(8000, () => console.log('Server bound'));