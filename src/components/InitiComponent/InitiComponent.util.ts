import { LaunchModel } from "../../store";
import { BoardModel } from "../../shared";

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
