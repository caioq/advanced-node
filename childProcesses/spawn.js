const { spawn } = require('child_process');

// const child = spawn('pwd');
const child = spawn('find', ['.', '-type', 'f']);

child.stdout.on('data', (data) => {
  console.log(`child stdout: \n${data}`)
})

child.stderr.on('data', (data) => {
  console.log(`child stderr: \n${data}`)
})

child.on('exit', (code, signal) => {
  // signal variable is null when the child process exits normally
  console.log(`child process exited with code ${code}, signal ${signal}`)
});

/**
 * Other events on child: 
 * - disconnect: when the parent process manually calls the child disconnect method
 * - error: triggered if the process could not be spawned or killed
 * - message: triggered when the child process uses the process send() method to send messages. 
 * This is how parent/child processes can communicate with each other.
 * - close: emmited when the stdio streams of child process get closed.
 * 
 * Every child process gets the three standard stdio streams.
 * stdio objects: child.stdin, child.stdout, child.stderr
 * 
 * Unlike is a normal process, in child process
 * stdout/stderr streams are readable streams
 * stdin stream is writable stream
 *  */ 