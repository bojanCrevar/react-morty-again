export interface RMItem {
  _id: string;
  name: string;
  id?: string;
}

export interface RMItemWithChars extends RMItem {
  charactersIds?: string[];
  charactersTooltip?: string;
  charactersString?: string;
  characters?: string[];
  residents?: string[];
}
