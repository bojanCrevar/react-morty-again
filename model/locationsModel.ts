import { RMItemWithChars } from "./RMItem";
const UNDEFINED_ID = -55;
export interface LocationsItem extends RMItemWithChars {
  type: string;
  dimension: string;
}

export type EditLocationsProps = {
  id: string;
};

export const emptyLocationItem: LocationsItem = {
  id: UNDEFINED_ID,
  name: "",
  type: "",
  dimension: "",
  residents: [],
};
