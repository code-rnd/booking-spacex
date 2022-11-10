import { configureStore } from "@reduxjs/toolkit";
import { launches } from "./sliceLaunches";

export const store = configureStore({ reducer: { launches } });
