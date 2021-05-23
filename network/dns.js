const dns = require('dns'); // name -- addresses

// dns lookup doest perform any network communication, uses libuv thread
dns.lookup('google.com', (err, address) => {
  console.log('lookup', address);
});

// with network communications
dns.resolve4('google.com', (err, address) => {
  console.log('resolve4', address);
});

// dns.resolve('google.com', 'MX', (err, address) => {
//   console.log('resolve MX', address);
// });
// dns.resolveMx('google.com', (err, address) => {
//   console.log('resolveMx', address);
// });

dns.reverse('172.217.30.174', (err, hostnames) => {
  console.log('hostnames ', hostnames);
})