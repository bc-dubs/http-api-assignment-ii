// GLOBALS
const users = {};

// METHODS
const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  if (object) { response.write(JSON.stringify(object)); }
  response.end();
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => {
  respondJSON(request, response, 404);
};

module.exports = {
  notFound,
  notFoundMeta,
};
