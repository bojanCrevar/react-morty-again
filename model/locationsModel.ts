export interface LocationsInfo {
  count: number;
  pages: number;
}
export interface LocationsItem {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

export interface LocationsModel {
  info: LocationsInfo;
  results: LocationsItem[];
}
