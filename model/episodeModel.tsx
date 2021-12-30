export const UNDEFINED_ID = -55;
import moment from "moment";

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
  air_date: moment(new Date()).format("MMMM DD, yyyy"),
  episode: "",
};

export type EditEpisodeProps = {
  id: string;
};
