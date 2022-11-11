import { LaunchModel, LaunchStatuses } from "../../store";

export interface BoardModel {
  id: number;
  title: LaunchStatuses;
  list: LaunchModel[];
  isViewMode?: boolean;
}
