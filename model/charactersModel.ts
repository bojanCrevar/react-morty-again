import { RMItem } from "./RMItem";

export interface CharactersItem extends RMItem {
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
