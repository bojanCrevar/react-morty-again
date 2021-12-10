import { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import EpisodeFormComponent from "../../../../components/episode/FormComponent";
import Wrapper from "../../../../components/Wrapper";
import moment from "moment";

export default function EditEpisode(props) {
  const [episode, setEpisode] = useState();

  async function submitHandler({ id, name, air_date, episodeDesc }) {
    var airDateObject = new Date(air_date);
    var formattedAirDate = moment(airDateObject).format("MMMM DD, yyyy");

    const episode = {
      id: id,
      name: name,
      air_date: formattedAirDate,
      episode: episodeDesc,
    };

    const response = await axios.put(
      `/api/episodes/${encodeURIComponent(id)}`,
      episode
    );

    if (response.status === 200) {
      Router.push("/episodes");
    }
  }

  async function getEpisode() {
    const response = await axios.get(
      `/api/episodes/${encodeURIComponent(props.params.id)}`
    );

    setEpisode(response.data.episode);
  }

  useEffect(() => {
    getEpisode();
  }, []);

  return episode ? (
    <Wrapper title={"Edit episode: " + episode.name}>
      <EpisodeFormComponent
        submitHandler={submitHandler}
        initialData={episode}
      />
    </Wrapper>
  ) : (
    <h1> Loading </h1>
  );
}
export async function getServerSideProps({ params }) {
  return { props: { params } };
}
