import { RMItemWithChars } from "./RMItem";
import moment from "moment";
export const UNDEFINED_ID = -55;

export interface EpisodeItem extends RMItemWithChars {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

export const emptyEpisodeItem: EpisodeItem = {
  id: UNDEFINED_ID,
  name: "",
  air_date: moment(new Date()).format("MMMM DD, yyyy"),
  episode: "",
  characters: [],
};

export type EditEpisodeProps = {
  id: string;
};
