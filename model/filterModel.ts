import React from "react";

export interface FilterModel {
  [key: string]: string[];
}

export interface FilterGroupConfig {
  title: string;
  values: string[];
  type: "checkbox" | "radio";
  key: string;
  operatorType?: string;
}

export interface FilterPanelProps {
  filterConfig: FilterGroupConfig[];
  date?: boolean;
  setActivePage: (arg: React.SetStateAction<number>) => void;
  triggerSearch: () => void;
}
