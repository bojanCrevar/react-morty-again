import { LocationsItem } from "./locationsModel";
import { RMItem } from "./RMItem";

export interface ColumnCfg {
  columnconfig: {
    key: string;
    title: string;
    tooltip?: string;
  }[];
  tabledata: RMItem[];
}
