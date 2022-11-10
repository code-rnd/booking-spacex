import { createSlice } from "@reduxjs/toolkit";

interface SliceLaunchesState {
  status: boolean;
}

const initialState: SliceLaunchesState = {
  status: false,
};

const sliceLaunches = createSlice({
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload.status;
    },
  },
  name: "launches",
});

export const launches = sliceLaunches.reducer;
export const { setStatus } = sliceLaunches.actions;
