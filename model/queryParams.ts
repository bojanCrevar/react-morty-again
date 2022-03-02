import { FilterModel } from './filterModel';

export interface QueryParams {
  [key: string]: string | FilterModel | undefined;
  activePage?: string;
  keyword?: string;
  sort?: string;
  filter?: FilterModel;
}
