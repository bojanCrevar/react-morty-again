import { RMItem } from "./RMItem";

export interface CharactersItem extends RMItem {
  _id: string;
  episode?: string[];
  gender: string;
  image: string;
  location?: { name: string };
  name: string;
  origin?: string[];
  species: string;
  status: string;
  favourite?: boolean;
}
