import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Router from "next/router";
import EpisodeFormComponent from "../../../../components/episode/FormComponent";
import Wrapper from "../../../../components/Wrapper";
import moment from "moment";
import { OverlayContext } from "../../../../context/OverlayContext";

export default function EditEpisode(props) {
  const [episode, setEpisode] = useState();

  const { setShowLoading, setMessage } = useContext(OverlayContext);

  async function submitHandler({ id, name, air_date, episodeDesc }) {
    var formattedAirDate = moment(new Date(air_date)).format("MMMM DD, yyyy");
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
    setShowLoading(true);
    setMessage("Loading episode's editor...");
    try {
      const response = await axios.get(
        `/api/episodes/${encodeURIComponent(props.params.id)}`
      );
      setEpisode(response.data.episode);
    } finally {
      setShowLoading(false);
    }
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
  ) : null;
}

export async function getServerSideProps({ params }) {
  return { props: { params } };
}
