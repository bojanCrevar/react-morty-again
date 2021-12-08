let episodes = require("../data/episodes.json");

const episodesRepo = {
  getAll,
  getById,
  create,
  //update,
  //delete: _delete,
};

function getAll() {
  return episodes;
}

function getById(id) {
  return episodes.find((x) => x.id.toString() === id.toString());
}

function create(episode) {
  episodes.push(episode);
}

/*function update({ id, name, status, gender, species, location }) {
  const user = characters.find((x) => x.id.toString() === id.toString());
  const index = characters.findIndex((x) => x.id.toString() === id.toString());

  characters[index] = {
    ...user,
    name: name,
    location: { ...user.location, name: location },
    status: status,
    gender: gender,
    species: species,
  };
}

function _delete(id) {
  // filter out deleted user and save
  characters = characters.filter((x) => x.id.toString() !== id.toString());
}
*/
export default episodesRepo;
