// to test input a expression then press ctrl + D
const { spawn } = require('child_process');

const child = spawn('wc');

// we pipe a readable stream into a writable stream
process.stdin.pipe(child.stdin);

child.stdout.on('data', (data) => {
  console.log(`child stdout: \n${data}`)
})

