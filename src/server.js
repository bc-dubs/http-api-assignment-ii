// Standard setup code
const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// This function mostly copied from body-parse-example
const addUser = (request, response) => {
  const body = [];

  request.on('error', (err) => { // function to call if error occurred
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => { // Called evey time we recieve a piece of data
    body.push(chunk);
  });

  request.on('end', () => { // Called when all data has been received
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);

    jsonHandler.addUser(request, response, bodyParams);
  });
};

const urlDict = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/getUsers': jsonHandler.getUsers,
    notFound: jsonHandler.notFound,
  },
  HEAD: {
    '/getUsers': jsonHandler.getUsersMeta,
    notFound: jsonHandler.notFoundMeta,
  },
  POST: {
    '/addUser': addUser,
    notFound: jsonHandler.notFound,
  },
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  // This line is weird but it DOES work in all cases
  const handlerFunction = urlDict[request.method]
    ? urlDict[request.method][parsedUrl.pathname] : urlDict.HEAD.notFound;

  (handlerFunction || urlDict[request.method].notFound)(request, response);
};

// Starting up server
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
