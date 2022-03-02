import { createSlice } from "@reduxjs/toolkit";

const filterInitialState = { keyword: "", filterValue: {} };

const filterKeywordSlice = createSlice({
  name: "filter&keyword",
  initialState: filterInitialState,
  reducers: {
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
    setFilter(state, action) {
      state.filterValue = action.payload;
    },
    resetKeywordAndFilter(state) {
      state.keyword = filterInitialState.keyword;
      state.filterValue = filterInitialState.filterValue;
    },
  },
});

export const filterActions = filterKeywordSlice.actions;

export default filterKeywordSlice;
