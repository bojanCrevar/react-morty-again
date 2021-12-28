import { EpisodeItem } from "./episodeModel";

interface FormComponentInput {
  submitHandler: () => {};
}

export interface EpisodeFormComponentInput extends FormComponentInput {
  initData: EpisodeItem;
}
