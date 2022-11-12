import { createAsyncThunk } from "@reduxjs/toolkit";

import { ApiLaunches } from "./launches.controller";
import { LAUNCHES_PREFIX } from "./sliceLaunches.const";
import { LaunchModel } from "./models";
import { mapperLaunchDtoToLaunch } from "./sliceLaunches.mapper";

export const getAllLaunches = createAsyncThunk(
  LAUNCHES_PREFIX + "/getAllLaunches",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await ApiLaunches.getAllLaunches();
      const prepareData = mapperLaunchDtoToLaunch(data) as LaunchModel[];

      return { launches: prepareData };
    } catch (e) {
      // @ts-ignore
      return rejectWithValue(e.message);
    }
  }
);
