const http = require('http');

const halve; // import from halve.js
const delayResponse; // import from delayResponse.js

const serverLogic = (request, response) => {

  let n = parseInt(request.url.slice(1));

  const result = halve(n);
  delayResponse(result, response);
}

const server = http.createServer(serverLogic);

server.listen(3000);
