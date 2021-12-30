import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Router from "next/router";
import EpisodeFormComponent from "../../../../components/episode/FormComponent";
import Wrapper from "../../../../components/Wrapper";
import moment from "moment";
import { EditEpisodeProps, EpisodeItem } from "../../../../model/episodeModel";
import { GetServerSidePropsContext } from "next/types";
import { OverlayContext } from "../../../../context/OverlayContext";
import ReactPlaceholder from "react-placeholder";
import SkeletonCreateEdit from "../../../../components/SkeletonCreateEdit";

export default function EditEpisode({ id: idFromUrl }: EditEpisodeProps) {
  const [episodeObj, setEpisodeObj] = useState<EpisodeItem>();

  const { setShowLoading, setMessage } = useContext(OverlayContext);

  async function submitHandler({ id, name, air_date, episode }: EpisodeItem) {
    const episodeForApi = {
      id: id,
      name: name,
      air_date: moment(new Date(air_date)).format("MMMM DD, yyyy"),
      episode: episode,
    };

    const response = await axios.put(
      `/api/episodes/${encodeURIComponent(id ?? 0)}`,
      episodeForApi
    );

    if (response.status === 200) {
      Router.push("/episodes");
    }
  }

  async function getEpisode() {
    // setShowLoading(true);
    setMessage("Loading episode's editor...");
    try {
      const response = await axios.get(
        `/api/episodes/${encodeURIComponent(idFromUrl)}`
      );
      setEpisodeObj(response.data.episode);
    } finally {
      // setShowLoading(false);
    }
  }

  useEffect(() => {
    getEpisode();
  }, []);

  return <SkeletonCreateEdit type={"round"} />;
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  return { props: params || {} };
}
