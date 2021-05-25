const { spawn } = require('child_process');

/** Detached mode
 * child process run independently of its parent process
 * to test and check both processes running use this cmd:
 * ps -ef | grep timer
 */
 const child = spawn('node', ['timer.js'], {
  detached: true,
  stdio: 'ignore' // to keep it running in the background the child's stdio config also have to be independent of the parent
});

child.unref(); // the parent process can exit independently of the child