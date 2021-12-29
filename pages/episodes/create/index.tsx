import axios from "axios";
import Router from "next/router";
import EpisodeFormComponent from "../../../components/episode/FormComponent";
import Wrapper from "../../../components/Wrapper";
import moment from "moment";
import { EpisodeItem } from "../../../model/episodeModel";

export default function CreateEpisode() {
  async function submitHandler({ name, air_date, episode }: EpisodeItem) {
    const episodeFormatted = {
      name: name,
      air_date: moment(new Date(air_date)).format("MMMM DD, yyyy"),
      episode: episode,
    };

    const response = await axios.post("/api/episodes", episodeFormatted);

    if (response.status === 200) {
      Router.push("/episodes");
    }
  }

  const episodeEmpty: EpisodeItem = {
    id: UNDEFINED_ID,
    name: "",
    air_date: moment(new Date()).format("MMMM DD, yyyy"),
    episode: "",
  };

  return (
    <Wrapper title={"Create new episode!"}>
      <EpisodeFormComponent
        submitHandler={submitHandler}
        initialData={episodeEmpty}
      />
    </Wrapper>
  );
}
