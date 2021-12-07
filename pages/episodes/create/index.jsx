import axios from "axios";
import Router from "next/router";
import EpisodeFormComponent from "../../../components/episode/FormComponent";
import Wrapper from "../../../components/Wrapper";
import moment from "moment";

export default function CreateEpisode() {
  async function submitHandler({ name, air_date, episodeDesc }) {
    // let formattedDate = new Date(air_date).toDateString();
    var t = new Date(air_date);
    var formattedAirDate = moment(t).format("MMMM d,yyyy");

    const episode = {
      name: name,
      air_date: formattedAirDate,
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
