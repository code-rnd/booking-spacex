import { createAsyncThunk } from "@reduxjs/toolkit";

import { ApiLaunches } from "../api-controller";
import { LAUNCHES_PREFIX } from "../constants";
import { LaunchModel } from "../models";
import { mapperLaunchDtoToLaunch } from "../mappers";
import { StoreModel } from "../../../store.model";
import { updateLaunchesUtil } from "../utils";

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

/** Метод апдейта элемента (замокано на промис)
 *  TODO: Сделано из-за того, что бекенд не дает осуществлять полный CRUD */
export const updateLaunch = createAsyncThunk(
  LAUNCHES_PREFIX + "/updateLaunch",
  async (launch: LaunchModel, { rejectWithValue, getState }) => {
    try {
      const data: LaunchModel = await new Promise((resolve, reject) => {
        setTimeout(() => resolve(launch), 500);
      });

      const nextLaunches = updateLaunchesUtil(
        (getState() as StoreModel).launches.launches,
        data
      );

      return { launches: nextLaunches };
    } catch (e) {
      // @ts-ignore
      return rejectWithValue(e.message);
    }
  }
);
