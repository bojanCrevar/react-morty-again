export interface FilterModel {
  [key: string]: string[];
}

export interface FilterGroupConfig {
  title: string;
  values: string[];
  type: "checkbox" | "radio";
  key: string;
}
