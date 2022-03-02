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
  initFilterValue: any;
  filterConfig: FilterGroupConfig[];
  date?: boolean;
  triggerSearch: () => void;
  closeModal?: () => void;
}
