let characters = require('../data/characters.json');

const charactersRepo = {
  getAll,
  getById,
  // create,
  // update,
  delete: _delete
};

function getAll() {
  return characters;
}

function getById(id) {
  return characters.find(x => x.id.toString() === id.toString());
}

// function create({ title, firstName, lastName, email, role, password }) {
//   const user = { title, firstName, lastName, email, role, password };
//
//   // validate
//   if (characters.find(x => x.email === user.email))
//     throw `User with the email ${user.email} already exists`;
//
//   // generate new user id
//   user.id = characters.length ? Math.max(...characters.map(x => x.id)) + 1 : 1;
//
//   // set date created and updated
//   user.dateCreated = new Date().toISOString();
//   user.dateUpdated = new Date().toISOString();
//
//   // add and save user
//   characters.push(user);
//   saveData();
// }

// function update(id, { title, firstName, lastName, email, role, password }) {
//   const params = { title, firstName, lastName, email, role, password };
//   const user = characters.find(x => x.id.toString() === id.toString());
//
//   // validate
//   if (params.email !== user.email && characters.find(x => x.email === params.email))
//     throw `User with the email ${params.email} already exists`;
//
//   // only update password if entered
//   if (!params.password) {
//     delete params.password;
//   }
//
//   // set date updated
//   user.dateUpdated = new Date().toISOString();
//
//   // update and save
//   Object.assign(user, params);
//   saveData();
// }

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
  // filter out deleted user and save
  characters = characters.filter(x => x.id.toString() !== id.toString());
}

export default charactersRepo;
