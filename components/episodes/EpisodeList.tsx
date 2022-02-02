import RMTable from "../RMTable";
import { useRouter } from "next/router";
import useCharacters from "../../hooks/useCharacters";
import { ActionContext } from "../../context/ActionContext";
import { ColumnCfg } from "../../model/columnCfgModel";
import { EpisodeItem } from "../../model/episodeModel";
import NoResults from "../NoResults";
import axios from "axios";
import { ResponseData } from "../../model/ResponseDataModel";
import React, { Dispatch, SetStateAction } from "react";

type EpisodeListProps = {
  episodes: EpisodeItem[];
  setData: Dispatch<SetStateAction<ResponseData<EpisodeItem>>>;
  episodeColumns: ColumnCfg<EpisodeItem>[];
};

const EpisodeList = ({
  episodes,
  setData,
  episodeColumns,
}: EpisodeListProps) => {
  const router = useRouter();
  const mappedEpisodes = useCharacters(episodes);
  function handleUpdate(id: number) {
    router.push("episodes/edit/" + id);
  }
  async function handleDelete(id: number) {
    setData((prev) => ({
      ...prev,
      results: mappedEpisodes.filter((x) => x.id !== id),
    }));
    const response = await axios.delete(
      `/api/episodes/${encodeURIComponent(id)}`
    );
  }

  return episodes.length > 0 ? (
    <ActionContext.Provider value={{ handleUpdate, handleDelete }}>
      <RMTable tableData={mappedEpisodes} columnConfig={episodeColumns} />
    </ActionContext.Provider>
  ) : (
    <NoResults />
  );
};

export default EpisodeList;
