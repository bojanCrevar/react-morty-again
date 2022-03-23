export interface RMItem {
  _id: string;
  name: string;
}

export interface RMItemWithChars extends RMItem {
  charactersIds?: string[];
  charactersTooltip?: string;
  charactersString?: string;
  characters?: string[];
  residents?: string[];
  displayName?: string;
  email?: string;
  userType?: string;
}
