let episodes = require("../data/episodes.json");

const episodesRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

function getAll() {
  return episodes;
}

function getById(id) {
  return episodes.find((x) => x.id.toString() === id.toString());
}

function create(char) {
  episodes.push(char);
}

function update({ id, name, air_date, serial }) {
  const episode = episodes.find((x) => x.id.toString() === id.toString());
  const index = episodes.findIndex((x) => x.id.toString() === id.toString());

  episodes[index] = {
    ...episode,
    name: name,
    air_date: air_date,
    episode: serial,
  };
}

function _delete(id) {
  // filter out deleted user and save
  episodes = episodes.filter((x) => x.id.toString() !== id.toString());
}

export default episodesRepo;
