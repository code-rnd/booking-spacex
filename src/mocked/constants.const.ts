import { BoardModel, TicketModel } from "./type.model";

export const TICKETS_MOCKED: TicketModel[] = [
  { id: 1, title: "Первый билет" },
  { id: 2, title: "Второй билет" },
  { id: 3, title: "Третий билет" },
  { id: 4, title: "Четвертый билет" },
  { id: 5, title: "Пятый билет" },
  { id: 6, title: "Шестой билет" },
];
export const BOARDS_MOCKED: BoardModel[] = [
  { id: 1, title: "Завершенная поездка", list: [...TICKETS_MOCKED] },
  { id: 2, title: "Доступный билет", list: [] },
  { id: 3, title: "Купленный билет", list: [] },
];
