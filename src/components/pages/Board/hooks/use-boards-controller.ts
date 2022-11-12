import { useCallback, useEffect, useState } from "react";

import { BoardModel } from "../../../../shared";
import {
  LaunchModel,
  setLaunches,
  useAppDispatch,
  useAppSelector,
} from "../../../../store";
import { initiBoards } from "../../../InitComponent";

/** Хук для управления состоянием досок
 *  TODO: Логика должна быть на бекенде */
export const useBoardsController = () => {
  const dispatch = useAppDispatch();
  const launches = useAppSelector((state) => state.launches.launches);
  const [boards, setBoards] = useState<BoardModel[]>([]);

  const updateLaunch = useCallback(
    (launch: LaunchModel) => {
      const status = launch.status === "booked" ? "available" : "booked";
      const nextLaunches = launches.map((item) => {
        if (item.id === launch.id) {
          return { ...item, status };
        } else {
          return item;
        }
      });

      dispatch(setLaunches({ launches: nextLaunches }));
    },
    [launches, dispatch]
  );

  useEffect(() => setBoards(initiBoards(launches)), [launches]);

  return { updateLaunch, boards };
};
