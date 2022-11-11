import { FC, useCallback, useState, DragEvent } from "react";
import { useNavigate } from "react-router-dom";

import { BoardModel } from "../../mocked/type.model";
import {
  LaunchModel,
  setBoards,
  useAppDispatch,
  useAppSelector,
} from "../../store";

import s from "./Board.module.scss";

/** TODO: Стилизовать по Ant */
export const Board: FC = () => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.launches.boards);
  const [currentBoard, setCurrentBoard] = useState<BoardModel>();
  const [currentTicket, setCurrentTicket] = useState<LaunchModel>();

  const navigate = useNavigate();

  const drugOverHandle = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const drugStartHandle = useCallback(
    (e: DragEvent<HTMLDivElement>, board: BoardModel, ticket: LaunchModel) => {
      setCurrentBoard(board);
      setCurrentTicket(ticket);
    },
    []
  );

  const dropHandle = useCallback(
    (e: DragEvent<HTMLDivElement>, board: BoardModel) => {
      e.preventDefault();

      if (!currentBoard || !currentTicket || board.id === currentBoard.id)
        return;

      let nextList = [...currentBoard.list];
      const currentIndex = nextList.indexOf(currentTicket);
      /** Удаляю элемент из одного массива */
      nextList.splice(currentIndex, 1);
      let prevList = [...board.list];
      /** Добавляю элемент в другой массив */
      prevList.push(currentTicket);
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
    [currentBoard, currentTicket, boards]
  );

  const dropBoardHandle = useCallback(
    (e: DragEvent<HTMLDivElement>, board: BoardModel) => {
      e.preventDefault();
      if (!currentBoard || !currentTicket || board.id === currentBoard.id)
        return;

      let nextList = [...currentBoard.list];
      const currentIndex = currentBoard.list.indexOf(currentTicket);
      /** Удаляю элемент из одного массива */
      nextList.splice(currentIndex, 1);
      /** Добавляю элемент в другой массив */
      let prevList = [...board.list];
      prevList.push(currentTicket);
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
    [currentTicket, currentBoard, boards]
  );

  return (
    <div className={s.container}>
      {boards.map((board) => (
        <div
          className={s.board}
          onDragOver={drugOverHandle}
          onDrop={(e) => dropBoardHandle(e, board)}
          key={board.id}
        >
          <div className={s.title}>{board.title}</div>
          <div className={s.list}>
            {board.list.map((ticket) => (
              <div
                onClick={() => navigate("/card/" + ticket.id)}
                onDragOver={drugOverHandle}
                onDragStart={(e) => drugStartHandle(e, board, ticket)}
                onDrop={(e) => dropHandle(e, board)}
                draggable={!board.isViewMode}
                className={s.item}
                key={ticket.id}
              >
                {ticket.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
