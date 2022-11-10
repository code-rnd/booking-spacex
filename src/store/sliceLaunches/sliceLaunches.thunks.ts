import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiLaunches } from "./launches.controller";
import { LAUNCHES_PREFIX } from "./sliceLaunches.const";

export const getLaunches = createAsyncThunk(
  LAUNCHES_PREFIX + "/getLaunches/query",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await ApiLaunches.getLaunches({});

      return data;
    } catch (e) {
      // @ts-ignore
      return rejectWithValue(e.message);
    }
  }
);

export const getLaunch = createAsyncThunk(
  LAUNCHES_PREFIX + "/getLaunch",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const { data } = await ApiLaunches.getLaunch(id);

      return data;
    } catch (e) {
      // @ts-ignore
      return rejectWithValue(e.message);
    }
  }
);
