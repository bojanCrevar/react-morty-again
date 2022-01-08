export interface FilterModel {
  [key: string]: string[];
}

export interface FilterGroupConfig {
  title: string;
  values: string[];
  type: "checkbox" | "radio";
  key: string;
}

export interface FilterPanelProps {
  filterConfig: FilterGroupConfig[];
  date?: boolean;
  submitFilterHandler: (e: any) => void;
}
