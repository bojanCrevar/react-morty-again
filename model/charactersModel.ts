import { PaginationModel } from "./paginationModel";

export interface CharactersModel {
  episode?: string[];
  gender: string;
  id: number;
  image: string;
  location?: { name: string };
  name: string;
  origin?: string[];
  species: string;
  status: string;
  favourite?: boolean;
}
export interface ResponseData {
  results: CharactersModel[];
  info: PaginationModel;
}
