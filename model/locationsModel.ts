import { RMItem } from "./RMItem";
const UNDEFINED_ID = -55;
export interface LocationsInfo {
  count: number;
  pages: number;
}
export interface LocationsItem extends RMItem {
  name: string;
  type: string;
  dimension: string;
  residents?: string[];
}

export interface LocationsModel {
  info: LocationsInfo;
  results: LocationsItem[];
}

export type EditLocationsProps = {
  id: string;
};

export const emptyLocationItem: LocationsItem = {
  id: UNDEFINED_ID,
  name: "",
  type: "",
  dimension: "",
};
