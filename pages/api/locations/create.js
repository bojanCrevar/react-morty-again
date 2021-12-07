import myLocationsRepo from "../../../utils/locations-repo";

export default async function handler(req, res) {
  switch (req.method) {
    default:
    case "POST":
      {
        const body = req.body;
        const insertObj = {
          id: myLocationsRepo.getAll().length + 1,
          ...body,
        };
        myLocationsRepo.create(insertObj);
        res.status(200).json("success");
      }
      break;
  }
}
