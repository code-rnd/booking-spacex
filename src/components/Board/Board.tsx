import { FC, useCallback, useState, DragEvent } from "react";
import { useNavigate } from "react-router-dom";

import {
  LaunchModel,
  setBoards,
  setCurrentCard,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { BoardModel } from "../../shared";

import s from "./Board.module.scss";

/** TODO: Стилизовать по Ant */
export const Board: FC = () => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.launches.boards);
  const [currentBoard, setCurrentBoard] = useState<BoardModel>();
  const [currentLaunch, setCurrentLaunch] = useState<LaunchModel>();

  const navigate = useNavigate();
  const goToCardHandle = useCallback(
    (launch: LaunchModel) => {
      dispatch(setCurrentCard({ card: launch }));
      navigate("/card/" + launch.id);
    },
    [dispatch, navigate]
  );

  const drugOverHandle = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const drugStartHandle = useCallback(
    (e: DragEvent<HTMLDivElement>, board: BoardModel, launch: LaunchModel) => {
      setCurrentBoard(board);
      setCurrentLaunch(launch);
    },
    []
  );

  const dropHandle = useCallback(
    (e: DragEvent<HTMLDivElement>, board: BoardModel) => {
      e.preventDefault();

      if (!currentBoard || !currentLaunch || board.id === currentBoard.id)
        return;

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
    [currentBoard, currentLaunch, boards, dispatch]
  );

  const dropBoardHandle = useCallback(
    (e: DragEvent<HTMLDivElement>, board: BoardModel) => {
      e.preventDefault();
      if (!currentBoard || !currentLaunch || board.id === currentBoard.id)
        return;

      let nextList = [...currentBoard.list];
      const currentIndex = currentBoard.list.indexOf(currentLaunch);
      /** Удаляю элемент из одного массива */
      nextList.splice(currentIndex, 1);
      /** Добавляю элемент в другой массив */
      let prevList = [...board.list];
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
    [currentLaunch, currentBoard, boards, dispatch]
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
            {board.list.map((launch) => (
              <div
                onClick={() => goToCardHandle(launch)}
                onDragOver={drugOverHandle}
                onDragStart={(e) => drugStartHandle(e, board, launch)}
                onDrop={(e) => dropHandle(e, board)}
                draggable={!board.isViewMode}
                className={s.item}
                key={launch.id}
              >
                {launch.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
