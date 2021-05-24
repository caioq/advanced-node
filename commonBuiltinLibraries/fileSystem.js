const fs = require('fs');

// Async form:
fs.readFile(__filename, (err, data) => {
  if (err) throw err;

  // returns a buffer if we dont specify a character encoding
  // do something
});

// Sync form:
const data = fs.readFileSync(__filename);
// exceptions are immediately thrown
// do something with data