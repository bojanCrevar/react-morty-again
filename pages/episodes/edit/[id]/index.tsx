import { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import EpisodeFormComponent from "../../../../components/episodes/FormComponent";
import Wrapper from "../../../../components/Wrapper";
import moment from "moment";
import { EditEpisodeProps, EpisodeItem } from "../../../../model/episodeModel";
import { GetServerSidePropsContext } from "next/types";
import EditSkeleton from "../../../../components/skeletons/EditSkeleton";
import episodesRepo from "../../../../utils/episode-repo";

export default function EditEpisode({ id: idFromUrl }: EditEpisodeProps) {
  const [episodeObj, setEpisodeObj] = useState<EpisodeItem>();

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
    const response = await axios.get(
      `/api/episodes/${encodeURIComponent(idFromUrl)}`
    );
    setEpisodeObj(response.data.episode);
  }

  useEffect(() => {
    getEpisode();
  }, []);

  return episodeObj ? (
    <Wrapper title={"Edit episode: " + episodeObj!.name}>
      <EpisodeFormComponent
        submitHandler={submitHandler}
        initialData={episodeObj!}
      />
    </Wrapper>
  ) : (
    <div className="m-auto">
      <EditSkeleton count={3} />
    </div>
  );
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const id = params!.id;

  let episode = episodesRepo.getById(id);

  if (!episode) {
    return { notFound: true };
  }

  return { props: params || {} };
}
