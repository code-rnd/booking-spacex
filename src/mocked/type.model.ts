import { LaunchModel, LaunchStatuses } from "../store";

/** TODO: Вынести */
export interface BoardModel {
  id: number;
  title: LaunchStatuses;
  list: LaunchModel[];
  isViewMode?: boolean;
}
