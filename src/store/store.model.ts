import { store } from "./store";

export type StoreModel = ReturnType<typeof store.getState>;
