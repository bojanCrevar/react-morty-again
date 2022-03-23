import { RMItemWithChars } from "./RMItem";
export interface LocationsItem extends RMItemWithChars {
  type: string;
  dimension: string;
}

export type EditLocationsProps = {
  location: LocationsItem;
};

export const emptyLocationItem: LocationsItem = {
  _id: "",
  name: "",
  type: "",
  dimension: "",
  residents: [],
};
