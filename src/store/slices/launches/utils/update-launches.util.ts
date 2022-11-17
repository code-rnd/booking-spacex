import { LaunchModel } from "../models";

/** TODO: Метод для подготови списка
 *  TODO: Сделано из-за того, что бекенд не дает осуществлять полный CRUD */
export const updateLaunchesUtil = (
  launches: LaunchModel[],
  launch: LaunchModel
): LaunchModel[] => {
  return launches.map((item) => {
    if (item.id === launch.id) {
      return launch;
    } else {
      return item;
    }
  });
};
