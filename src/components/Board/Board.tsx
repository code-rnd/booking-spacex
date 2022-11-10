import { FC, useCallback, useState, DragEvent, useEffect } from "react";

import { BOARDS_MOCKED } from "../../mocked/constants.const";
import { BoardModel, TicketModel } from "../../mocked/type.model";

import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../../store/sliceLaunches";

import s from "./Board.module.scss";

export const Board: FC = () => {
  const status = useSelector((state: any) => state.launches);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setStatus({ status: true }));
  }, [dispatch]);

  const [boards, setBoards] = useState(BOARDS_MOCKED);
  const [currentBoard, setCurrentBoard] = useState<BoardModel | undefined>(
    undefined
  );
  const [currentTicket, setCurrentTicket] = useState<TicketModel | undefined>(
    undefined
  );

  const drugOverHandle = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const drugStartHandle = useCallback(
    (e: DragEvent<HTMLDivElement>, board: BoardModel, ticket: TicketModel) => {
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

      const nextList = [...currentBoard.list];
      const currentIndex = nextList.indexOf(currentTicket);
      /** Удаляю элемент из одного массива */
      nextList.splice(currentIndex, 1);
      const prevList = [...board.list];
      /** Добавляю элемент в другой массив */
      prevList.push(currentTicket);
      /** Обновляю состояние новыми данными */
      setBoards(
        boards.map((b) => {
          if (b.id === board.id) {
            return { ...board, list: prevList };
          }
          if (b.id === currentBoard.id) {
            return { ...currentBoard, list: nextList };
          }
          return b;
        })
      );
    },
    [currentBoard, currentTicket]
  );

  const dropBoardHandle = useCallback(
    (e: DragEvent<HTMLDivElement>, board: BoardModel) => {
      e.preventDefault();
      if (!currentBoard || !currentTicket || board.id === currentBoard.id)
        return;

      const currentIndex = currentBoard.list.indexOf(currentTicket);
      /** Удаляю элемент из одного массива */
      currentBoard.list.splice(currentIndex, 1);
      /** Добавляю элемент в другой массив */
      board.list.push(currentTicket);
      /** Обновляю состояние новыми данными */
      setBoards(
        boards.map((b) => {
          if (b.id === board.id) {
            return board;
          }
          if (b.id === currentBoard.id) {
            return currentBoard;
          }
          return b;
        })
      );
    },
    [currentTicket, currentBoard]
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
            {Array.from(board.list).map((ticket) => (
              <div
                onDragOver={drugOverHandle}
                onDragStart={(e) => drugStartHandle(e, board, ticket)}
                onDrop={(e) => dropHandle(e, board)}
                draggable
                className={s.item}
                key={ticket.id}
              >
                {ticket.title}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
