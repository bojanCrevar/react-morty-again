let locations = require("../data/locations.json");

const locationsRepo = {
  getAll,
  create,
};

function getAll() {
  return locations;
}

function create(loc) {
  locations.push(loc);
}

export default locationsRepo;
