import { FC, useLayoutEffect } from "react";

import { getAllLaunches, useAppDispatch } from "../../store";

/** Компонент инициалзиации полного списка данных для досок
 *  TODO: Сделано из-за того, что бекенд не дает осуществлять полный CRUD */
export const InitComponent: FC = () => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(getAllLaunches());
  }, [dispatch]);

  return null;
};
