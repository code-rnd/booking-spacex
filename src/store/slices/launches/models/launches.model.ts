import { Links } from "./launchesDto.model";

export interface SliceLaunchesStateModel {
  launches: LaunchModel[];
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
