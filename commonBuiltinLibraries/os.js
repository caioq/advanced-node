const os = require('os');

console.log(`OS Type: `, os.type());
console.log(`OS Free memory: `, os.freemem());
console.log(`OS Release: `, os.release());
// userInfo: on windows, shell is null and uid and guid are -1
console.log(`OS User Info: `, os.userInfo());