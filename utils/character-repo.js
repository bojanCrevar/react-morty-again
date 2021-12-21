let characters = require("../data/characters.json");

const charactersRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

function getAll() {
  return characters;
}

function getById(id) {
  return characters.find((x) => x.id.toString() === id.toString());
}

function create(char) {
  characters.push(char);
}

function update({
  id,
  name,
  status,
  gender,
  species,
  location,
  image,
  favourite,
}) {
  const user = characters.find((x) => x.id.toString() === id.toString());
  const index = characters.findIndex((x) => x.id.toString() === id.toString());

  characters[index] = {
    ...user,
    name: name,
    location: { ...user.location, name: location },
    status: status,
    gender: gender,
    species: species,
    image: image,
    favourite: favourite,
  };
}

function _delete(id) {
  // filter out deleted user and save
  characters = characters.filter((x) => x.id.toString() !== id.toString());
}

export default charactersRepo;
