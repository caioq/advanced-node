const http = require('http');

 // request returns an object that is an event emitter
 // http.ClientRequest is writeable stream object (WritableStream/EE). Same as http.ServerResponse
// req: http.ClientRequest
 const req = http.request(
  { 
    hostname: 'www.google.com'
  },
  // does not have error variable callback response 
  (res) => {
    // res: http.IncomingMessage
    // logs an IncomingMessage
    // console.log(res);
    console.log(res.statusCode);
    console.log(res.headers);

    // data argument is a buffer
    res.on('data', (data) => {
      console.log(data.toString());
    });
  }
);

req.on('error', (e) => console.log(e));

req.write('...');

req.end();

// equivalent using http.get (does not need 'end' )
// node uses global http agent 
// to work with HTTPS, just replace http by https
const reqGet = http.get(
  'http://www.google.com',
  // does not have error variable callback response 
  (res) => {
    // logs an IncomingMessage
    // console.log(res);
    console.log(res.statusCode);
    console.log(res.headers);

    // data argument is a buffer
    res.on('data', (data) => {
      console.log(data.toString());
    });
  }
);

reqGet.on('error', (e) => console.log(e));

console.log(reqGet.agent) // http.Agent