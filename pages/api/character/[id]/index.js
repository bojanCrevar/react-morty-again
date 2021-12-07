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
        const character = myCharactersRepo.getById(id);
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
  }
}
