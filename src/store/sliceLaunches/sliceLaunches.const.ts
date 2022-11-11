import { SliceLaunchesStateModel } from "./sliceLaunches.model";

export const initialState: SliceLaunchesStateModel = {
  boards: [],
  launches: [],

  isLoading: false,
  error: null,
};

export const LAUNCHES_PREFIX = "launches";
