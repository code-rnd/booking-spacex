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
  extraReducers: (builder) => {
    /** getAllLaunches */
    builder.addCase(getAllLaunches.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllLaunches.fulfilled, (state, action) => {
      state.launches = action.payload.launches;
      state.isLoading = false;
    });
    builder.addCase(getAllLaunches.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    /** updateLaunch */
    builder.addCase(updateLaunch.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateLaunch.fulfilled, (state, action) => {
      state.launches = action.payload.launches;
      state.isLoading = false;
    });
    builder.addCase(updateLaunch.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const launchesReducer = launches.reducer;
export const { setCurrentCard, setLaunches } = launches.actions;
