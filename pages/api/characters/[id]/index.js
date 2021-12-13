import myCharactersRepo from "../../../../utils/character-repo";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      {
        //Change in master in the character\[id] file
        let { id } = req.query;
        if (!id) {
          res.status(404).json({ error: "No character!" });
        }

        let character = myCharactersRepo.getById(id);
        if (!character) {
          character = myCharactersRepo.getById(1);
        }
        res.status(200).json({
          character: character,
        });
      }
      break;
    case "PUT":
      {
        const body = req.body;
        myCharactersRepo.update(body);

        res.status(200).json("success");
      }
      break;
    case "DELETE":
      {
        let { id } = req.query;

        myCharactersRepo.delete(id);
        res.status(200).json("success");
      }
      break;
  }
}
