import { FC, useLayoutEffect } from "react";

import { getAllLaunches, LaunchModel, useAppDispatch } from "../../store";
import { BoardModel } from "../../mocked/type.model";

/** TODO: Вынести */
export const initiBoards = (list: LaunchModel[]): BoardModel[] => {
  return [
    {
      id: 1,
      title: "past",
      list: [...list.filter((item) => item.status === "past")],
      isViewMode: true,
    },
    {
      id: 2,
      title: "available",
      list: [...list.filter((item) => item.status === "available")],
    },
    {
      id: 3,
      title: "booked",
      list: [...list.filter((item) => item.status === "booked")],
    },
  ];
};

export const InitiComponent: FC = () => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(getAllLaunches());
  }, [dispatch]);

  return null;
};
