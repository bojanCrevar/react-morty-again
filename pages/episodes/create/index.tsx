import axios from "axios";
import Router from "next/router";
import EpisodeFormComponent from "../../../components/episodes/FormComponent";
import Wrapper from "../../../components/Wrapper";
import moment from "moment";
import { emptyEpisodeItem, EpisodeItem } from "../../../model/episodeModel";

export default function CreateEpisode() {
  async function submitHandler({
    name,
    air_date,
    episode,
    characters,
  }: EpisodeItem) {
    const episodeFormatted = {
      name: name,
      air_date: moment(new Date(air_date)).format("MMMM DD, yyyy"),
      episode: episode,
      characters: characters,
    };

    const response = await axios.post("/api/episodes", episodeFormatted);

    if (response.status === 200) {
      Router.push("/episodes");
    }
  }

  return (
    <Wrapper title={"Create new episode!"}>
      <EpisodeFormComponent
        submitHandler={submitHandler}
        initialData={emptyEpisodeItem}
      />
    </Wrapper>
  );
}
