import { LaunchModel } from "../store";

export interface BoardModel {
  id: number;
  title: string;
  list: LaunchModel[];
}

export interface TicketModel {
  id: number;
  title: string;
}
