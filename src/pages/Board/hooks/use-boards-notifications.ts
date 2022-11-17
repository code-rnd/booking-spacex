import { useCallback } from "react";
import { notification } from "antd";

import { BoardModel } from "../../../shared";
import { LaunchModel } from "../../../store";

interface ShowNotificationProps {
  currentBoard: BoardModel;
  board: BoardModel;
  currentLaunch: LaunchModel;
}
/** Хук для управления пушами */
export const useBoardsNotifications = () => {
  return useCallback((props: ShowNotificationProps) => {
    const { currentBoard, board, currentLaunch } = props;

    const isMakeReservation =
      currentBoard?.title === "available" && board?.title === "booked";
    const isCancelBooking =
      currentBoard?.title === "booked" && board?.title === "available";

    if (isMakeReservation) {
      notification.open({
        message: "Забронировано!",
        description: "Билет в " + currentLaunch?.name + " - забронирован!",
      });
    }

    if (isCancelBooking) {
      notification.open({
        message: "Отмена бронирования!",
        description: "Бронь на " + currentLaunch?.name + " - снята!",
      });
    }
  }, []);
};
