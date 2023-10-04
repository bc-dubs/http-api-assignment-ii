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

const getUsers = (request, response) => {
  respondJSON(request, response, 200, { users });
};

const getUsersMeta = (request, response) => {
  respondJSON(request, response, 200);
};

const addUser = (request, response, body) => {
  if (!body.name || !body.age) { // Missing parameters
    return respondJSON(request, response, 400, { message: 'Cannot add user unless both name and age are specified', id: 'addUserMissingParams' });
  }

  if (!users[body.name]) { // New name
    users[body.name] = {
      name: body.name,
      age: body.age,
    };
    return respondJSON(request, response, 201, { message: 'User created successfully' });
  }

  users[body.name].age = body.age; // Updating existing name
  return respondJSON(request, response, 204);
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
  getUsers,
  getUsersMeta,
  addUser,
  notFound,
  notFoundMeta,
};
