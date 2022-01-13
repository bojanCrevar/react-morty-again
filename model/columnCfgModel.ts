import { RMItem, RMItemWithChars } from './RMItem';

export interface ColumnCfg<T extends RMItem = RMItemWithChars> {
  key: keyof T;
  title: string;
  tooltip?: keyof T;
}

export interface ColumnModel<T extends RMItem = RMItemWithChars> {
  columnConfig: ColumnCfg<T>[];
  tableData: T[];
}
