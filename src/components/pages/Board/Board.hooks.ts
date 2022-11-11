import {
  LaunchModel,
  setBoards,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { useCallback } from "react";
import { BoardModel } from "../../../shared";
import { notification } from "antd";

interface ChangeLaunchProps {
  currentBoard: BoardModel;
  currentLaunch: LaunchModel;

  board: BoardModel;
}
/** Хук для управления состоянием досок
 *  TODO: Логика должна быть на бекенде */
export const useBoardsController = () => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.launches.boards);

  const changeLaunch = useCallback(
    (props: ChangeLaunchProps) => {
      const { currentBoard, currentLaunch, board } = props;

      let nextList = [...currentBoard.list];
      const currentIndex = nextList.indexOf(currentLaunch);
      /** Удаляю элемент из одного массива */
      nextList.splice(currentIndex, 1);
      let prevList = [...board.list];
      /** Добавляю элемент в другой массив */
      prevList.push(currentLaunch);
      /** Обновляю состояние новыми данными */
      dispatch(
        setBoards({
          boards: boards.map((b) => {
            if (b.id === board.id) {
              return { ...board, list: prevList };
            }
            if (b.id === currentBoard.id) {
              return { ...currentBoard, list: nextList };
            }
            return b;
          }),
        })
      );
    },
    [dispatch, boards]
  );

  return changeLaunch;
};

/** Хук для управления пушами */
interface ShowNotificationProps {
  currentBoard: BoardModel;
  board: BoardModel;
  currentLaunch: LaunchModel;
}
export const useBoardsNotifications = () => {
  const showNotification = useCallback((props: ShowNotificationProps) => {
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

  return showNotification;
};
