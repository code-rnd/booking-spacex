export interface BoardModel {
  id: number;
  title: string;
  list: TicketModel[];
}

export interface TicketModel {
  id: number;
  title: string;
}
