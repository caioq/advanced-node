const server = require('http').createServer();
const url = require('url');
const { URL } = require('url');
const querystring = require('querystring');
const data = {};

server.on('request', (req, res) => {
  switch (req.url) {
    case '/api':
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify(data));
      break;
    case '/home':
      res.writeHead(200, {
        'content-type': 'text/plain'
      });
      res.end('Home Page\n');
      break;
    case '/':
      res.writeHead(301, { 'Location': '/home' });
      res.end();
      break;
    default:
      // testing parsing url
      res.writeHead(200, {'content-type': 'text/plain'});
      console.log(`URL format: ${
        url.format({
          protocol: 'https',
          host: 'www.pluralsight.com',
          search: '?q=caio',
          pathname: '/search'
        })
      }`)
      res.end(`Testing URL\nParse: ${JSON.stringify(url.parse(req.url))}\n`);
      // const myURL = new URL(req.url);
      const myURL = new URL('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash');
      console.log('\nmyURL: ', myURL.toString());
      console.log('\nmyURL Pathname: ', myURL.pathname);
      console.log('\nmyURL Search: ', myURL.search);
      console.log('\nmyURL Hash: ', myURL.hash);

      // Query string
      console.log(`\nQuerystring module`)/
      console.log(`\nQuerystring object into url string: ${
        querystring.stringify({
          name: 'Caio Queiroz',
          website: 'querystringmodule.com/caio-queiroz'
        })
      }`);
      console.log(`\nQuerystring parse into object: ${
        JSON.stringify(
          querystring.parse('name=Caio%20Queiroz&website=querystringmodule.com%2Fcaio-queiroz')
        )
      }`);
      // res.writeHead(404); // not found
      res.end();
  }
});

server.listen(8000);