import { configureStore } from "@reduxjs/toolkit";
import { launches } from "./sliceLaunches";

import { StoreModel } from "./store.model";

export const store = configureStore<StoreModel>({ reducer: { launches } });
