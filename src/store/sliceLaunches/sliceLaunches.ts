import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./sliceLaunches.const";
import { getAllLaunches } from "./sliceLaunches.thunks";

const sliceLaunches = createSlice({
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
  },
});

export const launches = sliceLaunches.reducer;
export const { setCurrentCard, setLaunches } = sliceLaunches.actions;
