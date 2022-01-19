export interface PaginationModel {
  count: number;
  pages: number;
}

export const emptyPagination: PaginationModel = {
  count: 0,
  pages: 1,
};
