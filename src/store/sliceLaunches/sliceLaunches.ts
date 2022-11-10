import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./sliceLaunches.const";
import { getLaunch, getLaunches } from "./sliceLaunches.thunks";

const sliceLaunches = createSlice({
  initialState,
  reducers: {
    setStatus(state, action) {
      state.isLoading = action.payload.isLoading;
    },
  },
  name: "launches",
  extraReducers: (builder) => {
    /** getLaunches */
    builder.addCase(getLaunches.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getLaunches.fulfilled, (state, action) => {
      state.isLoading = false;
      state.launchesData = action.payload;
    });
    builder.addCase(getLaunches.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    /** getLaunch */
    builder.addCase(getLaunch.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getLaunch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentLaunch = action.payload;
    });
    builder.addCase(getLaunch.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const launches = sliceLaunches.reducer;
export const { setStatus } = sliceLaunches.actions;
