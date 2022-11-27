import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./constants";
import { getAllLaunches, updateLaunch } from "./thunks";

const launches = createSlice({
  initialState,
  reducers: {
    setLaunches(state, action) {
      state.launches = action.payload.launches;
    },
    setCurrentCard(state, action) {
      state.currentCard = action.payload.card;
    },
  },
  name: "launches",
  extraReducers: {
    /** getAllLaunches */
    [getAllLaunches.pending.type]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [getAllLaunches.fulfilled.type]: (state, action) => {
      state.launches = action.payload.launches;
      state.isLoading = false;
    },
    [getAllLaunches.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    /** updateLaunch */
    [updateLaunch.pending.type]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [updateLaunch.fulfilled.type]: (state, action) => {
      state.launches = action.payload.launches;
      state.isLoading = false;
    },
    [updateLaunch.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const launchesReducer = launches.reducer;
export const { setCurrentCard, setLaunches } = launches.actions;
