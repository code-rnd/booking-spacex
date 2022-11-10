import { SliceLaunchesStateModel } from "./sliceLaunches.model";

export const initialState: SliceLaunchesStateModel = {
  launchesData: {
    docs: [],
    totalDocs: 0,
    offset: 0,
    limit: 0,
    totalPages: 0,
    page: 0,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: 0,
    nextPage: 0,
  },
  isLoading: false,
  error: null,
};

export const LAUNCHES_PREFIX = "launches";
