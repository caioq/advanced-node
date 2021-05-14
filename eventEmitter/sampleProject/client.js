const EventEmitter = require('events');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = new EventEmitter();
const server = require('./server')(client);

server.on('response', (resp) => {
  // console.log(`Resp: ${resp}`);
  process.stdout.write('\u001B[2J\u001B[0;0f'); // special commando to clear terminal
  process.stdout.write(resp);
  process.stdout.write('\n\> '); // prompt to receive another command
})

let command, args;
rl.on('line', (input) => {
  [command, ...args] = input.split(' ');
  client.emit('command', command, args);
});