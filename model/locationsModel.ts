import { RMItem } from "./RMItem";

export interface LocationsInfo {
  count: number;
  pages: number;
}
export interface LocationsItem extends RMItem {
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

export interface LocationsModel {
  info: LocationsInfo;
  results: LocationsItem[];
}
