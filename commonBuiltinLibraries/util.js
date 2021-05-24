const util = require('util');

console.log(util.format('One %s', 'thing'));
console.log(module);
// inspect returns the string
console.log(util.inspect(module));
console.log(util.inspect(global, {
  depth: 0
}));
/**
 * Console:
 * console.info: is just an alias to console.log
 * console.error: behaves exactly like console.log but writes to stderr instead of stdout
 * console.warn: is an alias for console.error
 */
// it will throw an AssertionError if its not
// console.assert(3 === '3');

// console.trace behaves like console.error, but it also prints the call stack at the point where its placed
console.trace("here");

// console time and timeEnd to start and stop timers and report the duration of an operation
console.time("timer1");
console.timeEnd("timer1");

/**
 * With ES6 classes and the extends keyword, 
 * the use of util.inherits method is no longer needed or recommended
 */