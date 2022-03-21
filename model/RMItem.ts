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
  username?: string;
  email?: string;
  userType?: string;
}
