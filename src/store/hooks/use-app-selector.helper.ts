import { TypedUseSelectorHook, useSelector } from "react-redux";
import { StoreModel } from "../store.model";

/** TODO: Проблема с типами из-за версий библиотек react / react-redux / toolkit
 * Временное решение - заменить хук, что бы не типизировать в каждой точке вызова */
export const useAppSelector = useSelector as TypedUseSelectorHook<StoreModel>;
