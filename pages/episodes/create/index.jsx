import axios from "axios";
import Router from "next/router";
import EpisodeFormComponent from "../../../components/episode/FormComponent";
import Wrapper from "../../../components/Wrapper";

export default function CreateEpisode() {
  async function submitHandler({ name, air_date, episodeDesc }) {
    const episode = {
      name: name,
      air_date: air_date,
      episode: episodeDesc,
    };
    const response = await axios.post("/api/episodes", episode);
    if (response.status === 200) {
      Router.push("/episodes");
    }
  }

  return (
    <Wrapper title={"Create new episode!"}>
      <EpisodeFormComponent submitHandler={submitHandler} initialData={""} />
    </Wrapper>
  );
}
