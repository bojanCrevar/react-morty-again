import { createSlice } from "@reduxjs/toolkit";

const filterInitialState = { keyword: "", filterObject: {} };

const filterKeywordSlice = createSlice({
  name: "filter&keyword",
  initialState: filterInitialState,
  reducers: {
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
    setFilter(state, action) {
      state.filterObject = action.payload;
    },
  },
});

export const filterActions = filterKeywordSlice.actions;

export default filterKeywordSlice;
