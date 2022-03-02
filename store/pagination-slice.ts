import { createSlice } from "@reduxjs/toolkit";

const PaginationSlice = createSlice({
  name: "paginate",
  initialState: { activePage: 1 },
  reducers: {
    setActivePage(state, action) {
      console.log("action.payload.page", action);
      state.activePage = +action.payload;
    },
  },
});

export const paginationActions = PaginationSlice.actions;

export default PaginationSlice;
