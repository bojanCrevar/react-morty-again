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
import { PAGE_SIZE } from "../../utils/apiResponse";

type EpisodeListProps = {
  episodes: EpisodeItem[];
  setData: Dispatch<SetStateAction<ResponseData<EpisodeItem>>>;
  setLoader: Dispatch<SetStateAction<Boolean>>;
  episodeColumns: ColumnCfg<EpisodeItem>[];
};

const EpisodeList = ({
  episodes,
  setData,
  setLoader,
  episodeColumns,
}: EpisodeListProps) => {
  const router = useRouter();
  const mappedEpisodes = useCharacters(episodes);
  function handleUpdate(id: number) {
    router.push("episodes/edit/" + id);
  }
  async function handleDelete(id: number) {
    const response = await axios.delete(
      `/api/episodes/${encodeURIComponent(id)}`
    );
    if (response.status === 200) {
      setLoader(true);
      setData((prev) => ({
        ...prev,
        info: {
          count: prev.info.count - 1,
          pages:
            prev.info.count % PAGE_SIZE === 1
              ? prev.info.pages - 1
              : prev.info.pages,
        },
      }));
    }
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
