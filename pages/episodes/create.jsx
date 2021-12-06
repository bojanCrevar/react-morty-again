import axios from "axios";
import Router from "next/router";
import EpisodeFormComponent from "../components/episode/FormComponent";
import Wrapper from "../components/Wrapper";

export default function CreateEpisode() {
  async function submitHandler({ name, air_date, serial }) {
    const character = {
      id:id, name:name, air_date:air_date, serial:serial, characters =[]
    };
    const response = await axios.post("/api/episodes/create", episode);
    if (response.status === 200) {
      Router.push("/");
    }
  }

  return (
    <Wrapper title={"Create new episode!"}>
      <EpisodeFormComponent submitHandler={submitHandler} initialData={""} />
    </Wrapper>
  );
}
