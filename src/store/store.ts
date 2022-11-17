import { configureStore } from "@reduxjs/toolkit";

import { launchesReducer as launches } from "./slices/launches";

export const store = configureStore({ reducer: { launches } });
