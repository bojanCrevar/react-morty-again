import locationsRepo from "../../../../utils/locations-repo";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      {
        let { id } = req.query;
        if (!id) {
          res.status(404).json({ error: "No location!" });
        }
        const location = locationsRepo.getById(id);
        res.status(200).json({
          location: location,
        });
      }
      break;
    case "PUT":
      {
        const body = req.body;
        locationsRepo.update(body);

        res.status(200).json("success");
      }
      break;
    default:
      break;
  }
}
