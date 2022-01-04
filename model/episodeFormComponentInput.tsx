import { EpisodeItem } from "./episodeModel";

export default interface EpisodeFormComponentInput {
  initialData: EpisodeItem;
  submitHandler: (data: EpisodeItem) => void;
}
