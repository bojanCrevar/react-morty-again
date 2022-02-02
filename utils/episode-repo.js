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

function create(episode) {
  episodes.push(episode);
}

function update({ id, name, air_date, episode, characters }) {
  const episodeObject = this.getById(id);
  const index = episodes.findIndex((x) => x.id.toString() === id.toString());

  episodes[index] = {
    ...episodeObject,
    name: name,
    air_date: air_date,
    episode: episode,
    characters: characters,
  };
}

function _delete(id) {
  // filter out deleted episode and save
  episodes = episodes.filter((x) => x.id.toString() !== id.toString());
}

export default episodesRepo;
