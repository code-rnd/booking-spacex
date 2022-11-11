import { LaunchStatuses, SliceLaunchesStateModel } from "./models";

export const initialState: SliceLaunchesStateModel = {
  boards: [],

  isLoading: false,
  error: null,
};

export const LAUNCH_STATUSES: LaunchStatuses[] = [
  "past", // завершено
  "available", // доступно
  "booked", // забронировано
];

export const LAUNCHES_PREFIX = "launches";
