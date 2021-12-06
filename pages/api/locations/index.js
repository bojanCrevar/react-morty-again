import axios from "axios";
//import myLocationsRepo from "../../utils/locations-repo";

export default async function handler(req, res) {
  switch (req.method) {
    default:
    case "GET": {
      const response = await axios.get(
        "https://rickandmortyapi.com/api/location"
      );

      res.status(200).json(response.data);

      break;
    }
  }
}
