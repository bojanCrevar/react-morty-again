import myCharactersRepo from "../../../../utils/character-repo";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      {
        let { id } = req.query;
        console.log(id);
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
        console.log(body);
        console.log("PUT METHOD");

        myCharactersRepo.update(body);

        res.status(200).json("success");
      }
      break;
  }
}
