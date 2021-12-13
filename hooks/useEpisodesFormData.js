import moment from "moment";
import { useState } from "react";
function useEpisodesFormData(initialData) {
  if (initialData) {
    var airDateObject = new Date(initialData.air_date);
    var formattedAirDate = moment(airDateObject).format("YYYY-MM-DD");
  }

  const [episodeData, setEpisodeData] = useState({
    name: initialData.name || "",
    air_date: initialData ? formattedAirDate : "",
    episodeDesc: initialData.episode || "",
    id: initialData.id,
  });

  return {
    episodeData,
    setEpisodeData,
  };
}

export default useEpisodesFormData;
