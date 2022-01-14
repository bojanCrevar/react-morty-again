import { PaginationModel } from "./paginationModel";
import { RMItem } from "./RMItem";

export interface ResponseData<T extends RMItem> {
  results: T[];
  info: PaginationModel;
}
