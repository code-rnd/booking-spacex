import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./sliceLaunches.const";
import { getAllLaunches } from "./sliceLaunches.thunks";
import { LaunchModel } from "./sliceLaunches.model";

const sliceLaunches = createSlice({
  initialState,
  reducers: {
    setBoards(state, action) {
      state.boards = action.payload.boards;
    },
  },
  name: "launches",
  extraReducers: (builder) => {
    /** getLaunches */
    builder.addCase(getAllLaunches.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllLaunches.fulfilled, (state, action) => {
      state.isLoading = false;
      state.launches = action.payload as LaunchModel[];
    });
    builder.addCase(getAllLaunches.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const launches = sliceLaunches.reducer;
export const { setBoards } = sliceLaunches.actions;
