import { Links } from "./launchesDto.model";
import { BoardModel } from "../../../shared";

export interface SliceLaunchesStateModel {
  boards: BoardModel[];
  currentCard?: LaunchModel;

  isLoading: boolean;
  error: any;
}
export type LaunchStatuses = "past" | "available" | "booked"; // Завершен, Свободен, Куплен
export interface LaunchModel {
  id: string;
  name: string;
  description: string;
  status: LaunchStatuses;
  links: Links;
}
