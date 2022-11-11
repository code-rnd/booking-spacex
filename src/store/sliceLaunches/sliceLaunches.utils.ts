import { LaunchStatuses } from "./models";
import { LAUNCH_STATUSES } from "./sliceLaunches.const";

export const getStatusRndGen = (
  max: number = 2,
  min: number = 0
): LaunchStatuses => {
  let rnd = Math.floor(min + Math.random() * (max + 1 - min));
  return LAUNCH_STATUSES[rnd];
};
