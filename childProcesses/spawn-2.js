const { spawn } = require('child_process');

// spawn might inherit the stdio object stream
// const child = spawn('find', ['.', '-type', 'f'], {
//   stdio: 'inherit'
// });

/** Shell mode:
 * This way spawn will use a shell but it will still not buffer the data the 
 * way exec does (best of two worlds)
 */

// const child = spawn('find . -type f', {
//   stdio: 'inherit',
//   shell: true
// });

/** Different cwd - change working directory of the script */

// const child = spawn('find . -type f | wc -l', {
//   stdio: 'inherit',
//   shell: true,
//   cwd: '/home/caioq/advanced-node'
// });

/** Using env option */

// const child = spawn('echo $HOME', {
//   stdio: 'inherit',
//   shell: true,
// });
// const childWithEnv = spawn('echo $ANSWER', {
//   stdio: 'inherit',
//   shell: true,
//   env: { ANSWER: 42 } // env property overwrite the parent env variables
// });
