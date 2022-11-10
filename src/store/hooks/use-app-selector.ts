import { TypedUseSelectorHook, useSelector } from "react-redux";
import { StoreModel } from "../store.model";

export const useAppSelector = useSelector as TypedUseSelectorHook<StoreModel>;
