import { RMItemWithChars } from "./RMItem";
import moment from "moment";
export const UNDEFINED_ID = "";

export interface EpisodeItem extends RMItemWithChars {
  _id: string;
  name: string;
  air_date: string;
  episode: string;
}

export const emptyEpisodeItem: EpisodeItem = {
  _id: UNDEFINED_ID,
  name: "",
  air_date: moment(new Date()).format("MMMM DD, yyyy"),
  episode: "",
  characters: [],
};

export type EditEpisodeProps = {
  id: string;
};
