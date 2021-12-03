import myCharactersRepo from "../../../utils/character-repo";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      {
        const body = req.body;
        const insertObj = {
          id: myCharactersRepo.getAll().length + 1,
          ...body,
        };
        myCharactersRepo.create(insertObj);
        res.status(200).json("success");
      }
      break;
  }
}
