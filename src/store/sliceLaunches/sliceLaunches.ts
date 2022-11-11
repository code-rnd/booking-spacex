import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./sliceLaunches.const";
import { getAllLaunches } from "./sliceLaunches.thunks";

const sliceLaunches = createSlice({
  initialState,
  reducers: {
    setBoards(state, action) {
      state.boards = action.payload.boards;
    },
    setCurrentCard(state, action) {
      state.currentCard = action.payload.card;
    },
  },
  name: "launches",
  extraReducers: (builder) => {
    /** getLaunches */
    builder.addCase(getAllLaunches.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllLaunches.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getAllLaunches.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const launches = sliceLaunches.reducer;
export const { setBoards, setCurrentCard } = sliceLaunches.actions;
