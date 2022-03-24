import { RMItemWithChars } from "./RMItem";
const UNDEFINED_ID = "";
export interface LocationsItem extends RMItemWithChars {
  type: string;
  dimension: string;
}

export type EditLocationsProps = {
  location: LocationsItem;
};

export const emptyLocationItem: LocationsItem = {
  _id: UNDEFINED_ID,
  name: "",
  type: "",
  dimension: "",
  residents: [],
};
