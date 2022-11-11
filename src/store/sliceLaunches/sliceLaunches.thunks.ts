import { createAsyncThunk } from "@reduxjs/toolkit";

import { ApiLaunches } from "./launches.controller";
import { LAUNCHES_PREFIX } from "./sliceLaunches.const";
import { setBoards } from "./sliceLaunches";
import { initiBoards } from "../../components";
import { LaunchModel } from "./models";
import { mapperLaunchDtoToLaunch } from "./sliceLaunches.mapper";

export const getAllLaunches = createAsyncThunk(
  LAUNCHES_PREFIX + "/getAllLaunches",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await ApiLaunches.getAllLaunches();
      const prepareData = mapperLaunchDtoToLaunch(data) as LaunchModel[];
      const boards = initiBoards(prepareData);
      dispatch(setBoards({ boards }));
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
