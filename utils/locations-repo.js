let locations = require("../data/locations.json");

const locationsRepo = {
  getAll,
  create,
  getById,
  update,
  delete: _delete,
};

function getAll() {
  return locations;
}

function getById(id) {
  return locations.find((x) => x.id.toString() === id.toString());
}

function update({ id, name, dimension, type, residents }) {
  const loc = locations.find((x) => x.id.toString() === id.toString());
  const index = locations.findIndex((x) => x.id.toString() === id.toString());

  locations[index] = {
    ...loc,
    name: name,
    dimension: dimension,
    type: type,
    residents: residents,
  };
}

function create(loc) {
  locations.push(loc);
}

function _delete(id) {
  locations = locations.filter((x) => x.id.toString() !== id.toString());
}

export default locationsRepo;
