import { LaunchStatuses, SliceLaunchesStateModel } from "./models";

export const initialState: SliceLaunchesStateModel = {
  boards: [],

  isLoading: false,
  error: null,
};

export const LAUNCH_STATUSES: LaunchStatuses[] = [
  "past",
  "available",
  "booked",
];

export const LAUNCHES_PREFIX = "launches";
