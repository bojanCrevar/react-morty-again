export interface RMItem {
  id: number;
  name: string;
}

export interface RMItemWithChars extends RMItem {
  charactersIds?: string[];
  charactersTooltip?: string;
  charactersString?: string;
  characters?: string[];
  residents?: string[];
}
