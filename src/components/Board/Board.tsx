import { FC, useCallback, useState, DragEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { BOARDS_MOCKED } from "../../mocked/constants.const";
import { BoardModel } from "../../mocked/type.model";
import {
  getLaunches,
  LaunchModel,
  useAppDispatch,
  useAppSelector,
} from "../../store";

import s from "./Board.module.scss";

export const Board: FC = () => {
  const [boards, setBoards] = useState(BOARDS_MOCKED);
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

      let nextList = [...currentBoard.list];
      const currentIndex = currentBoard.list.indexOf(currentTicket);
      /** Удаляю элемент из одного массива */
      nextList.splice(currentIndex, 1);
      /** Добавляю элемент в другой массив */
      let prevList = [...board.list];
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
    [currentTicket, currentBoard]
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getLaunches());
  }, []);
  const launches = useAppSelector((state) => state.launches.launchesData.docs);
  useEffect(() => {
    const next = [...boards];
    next[1].list = launches;
    setBoards(next);
  }, [launches]);

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
                draggable
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
