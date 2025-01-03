const http = require('http');

const server = http.createServer((req, res) => {
  // Without this check, the server will crash if the request body is too large
  req.on('error', (err) => {
    console.error(err);
    res.statusCode = 413; // Payload Too Large
    res.end('Payload Too Large');
  });

  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Success', data }));
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.statusCode = 400; // Bad Request
      res.end('Bad Request');
    }
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});