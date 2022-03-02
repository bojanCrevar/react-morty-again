import { createSlice } from "@reduxjs/toolkit";

const PaginationSlice = createSlice({
  name: "paginate",
  initialState: { activePage: 1 },
  reducers: {
    setActivePage(state, action) {
      state.activePage = +action.payload;
    },
    resetActivePage(state) {
      state.activePage = 1;
    },
  },
});

export const paginationActions = PaginationSlice.actions;

export default PaginationSlice;
