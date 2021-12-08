let locations = require("../data/locations.json");

const locationsRepo = {
  getAll,
  create,
  getById,
  update,
};

function getAll() {
  return locations;
}

function getById(id) {
  return locations.find((x) => x.id.toString() === id.toString());
}

function update({ id, name, dimension, type }) {
  const loc = locations.find((x) => x.id.toString() === id.toString());
  const index = locations.findIndex((x) => x.id.toString() === id.toString());

  locations[index] = {
    ...loc,
    name: name,
    dimension: dimension,
    type: type,
  };
}

function create(loc) {
  locations.push(loc);
}

export default locationsRepo;
