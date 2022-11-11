import { createAsyncThunk } from "@reduxjs/toolkit";

import { ApiLaunches } from "./launches.controller";
import { LAUNCHES_PREFIX } from "./sliceLaunches.const";
import { mapperLaunchDtoToLaunch } from "./sliceLaunches.utils";
import { setBoards } from "./sliceLaunches";
import { initiBoards } from "../../components";
import { LaunchModel } from "./sliceLaunches.model";

/** TODO: Привести в порядок стор, карточки хранить локально, доски в сторе, а лаунчи нигде не хранить */

export const getAllLaunches = createAsyncThunk(
  LAUNCHES_PREFIX + "/getAllLaunches",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await ApiLaunches.getAllLaunches();
      const prepareData = mapperLaunchDtoToLaunch(data) as LaunchModel[];
      const boards = initiBoards(prepareData);
      dispatch(setBoards({ boards }));

      return prepareData;
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
