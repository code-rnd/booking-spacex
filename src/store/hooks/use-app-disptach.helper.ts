import { useDispatch } from "react-redux";
import { store } from "../index";

/** TODO: Проблема с типами из-за версий библиотек react / react-redux / toolkit
 * Временное решение - заменить хук, что бы не типизировать в каждой точке вызова */
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
