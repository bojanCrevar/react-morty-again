export const UNDEFINED_ID = -55;
export interface ResponseData {
  results: EpisodeItem[];
  info: PageInfo;
}

export interface EpisodeItem {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

export interface PageInfo {
  count: number;
  pages: number;
}

export const emptyEpisodeItem: EpisodeItem = {
  id: UNDEFINED_ID,
  name: "",
  air_date: "",
  episode: "",
};

export type EditEpisodeProps = {
  props: {
    id: string;
  };
};
