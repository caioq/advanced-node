const fs = require('fs');

// nodejs users will always assume that cb function will be the last argument
const readFileAsArray = function(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, function(err, data) {
      if (err) {
        return reject(err);
      }
  
      const lines = data.toString().trim().split('\n');
      resolve(lines);
    });
  });
};
// you can also work with both, callback interface and promise:
const readFileAsArrayWithBoth = function(file, cb = () => {}) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, function(err, data) {
      if (err) {
        reject(err);
        return cb(err);
      }
  
      const lines = data.toString().trim().split('\n');
      resolve(lines);
      cb(null, lines);
    });
  });
};

// example call using promises
readFileAsArray('./numbers')
  .then(lines => {
    const numbers = lines.map(Number);
    const oddNumbers = numbers.filter(number => number % 2 === 1);
    console.log('odd numbers count:', oddNumbers.length);
  })
  .catch(console.error);

// example using callback interface
readFileAsArrayWithBoth('./numbers', (err, lines) => {
  if (err) throw err;

  const numbers = lines.map(Number);
  const oddNumbers = numbers.filter(number => number % 2 === 1);
  console.log('odd numbers count:', oddNumbers.length);
});

// example async code
// treat async code as linear making a lot more readable
async function countOdd() {
  try {
    const lines = await readFileAsArray('./numbers');

    const numbers = lines.map(Number);
    const oddCount = numbers.filter(number => number % 2 === 1).length;
    console.log('odd numbers count:', oddCount);
  } catch (err) {
    console.error(err);
  }
}

countOdd();