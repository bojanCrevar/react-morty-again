import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Router from "next/router";
import EpisodeFormComponent from "../../../../components/episode/FormComponent";
import Wrapper from "../../../../components/Wrapper";
import moment from "moment";
import { OverlayContext } from "../../../../context/OverlayContext";

export default function EditEpisode(props) {
  const [episodeObj, setEpisodeObj] = useState();

  const { setShowLoading, setMessage } = useContext(OverlayContext);

  async function submitHandler({ id, name, air_date, episode }) {
    const episodeForApi = {
      id: id,
      name: name,
      air_date: moment(new Date(air_date)).format("MMMM DD, yyyy"),
      episode: episode,
    };

    const response = await axios.put(
      `/api/episodes/${encodeURIComponent(id)}`,
      episodeForApi
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
      setEpisodeObj(response.data.episode);
    } finally {
      setShowLoading(false);
    }
  }

  useEffect(() => {
    getEpisode();
  }, []);

  return episodeObj ? (
    <Wrapper title={"Edit episode: " + episodeObj.name}>
      <EpisodeFormComponent
        submitHandler={submitHandler}
        initialData={episodeObj}
      />
    </Wrapper>
  ) : null;
}

export async function getServerSideProps({ params }) {
  return { props: { params } };
}
