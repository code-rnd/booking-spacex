import { FC, useCallback, useState, DragEvent } from "react";
import { useNavigate } from "react-router-dom";
import { List, Avatar } from "antd";

import { initiBoards } from "../../components";
import {
  LaunchModel,
  setCurrentCard,
  updateLaunch,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { BoardModel } from "../../shared";
import { useBoardsNotifications } from "./hooks";

import s from "./Board.module.scss";

export const Board: FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.launches.isLoading);
  const launches = useAppSelector((state) => state.launches.launches);
  const boards = initiBoards(launches);

  const showNotification = useBoardsNotifications();

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

      if (
        !currentBoard ||
        !currentLaunch ||
        board.id === currentBoard.id ||
        board.title === "past"
      )
        return;

      const status = currentLaunch.status === "booked" ? "available" : "booked";
      dispatch(updateLaunch({ ...currentLaunch, status }));
    },
    [currentBoard, currentLaunch, dispatch]
  );

  const dropBoardHandle = useCallback(
    (e: DragEvent<HTMLDivElement>, board: BoardModel) => {
      e.preventDefault();
      if (
        !currentBoard ||
        !currentLaunch ||
        board.id === currentBoard.id ||
        board.title === "past"
      )
        return;

      showNotification({ currentBoard, currentLaunch, board });
      const status = currentLaunch.status === "booked" ? "available" : "booked";
      updateLaunch({ ...currentLaunch, status });
    },
    [currentLaunch, currentBoard, showNotification, dispatch]
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
          <div
            className={s.title}
          >{`${board.title} / (${board.list.length})`}</div>
          <List
            loading={isLoading}
            itemLayout="horizontal"
            dataSource={board.list}
            renderItem={(launch) => (
              <List.Item
                onClick={() => goToCardHandle(launch)}
                onDragOver={drugOverHandle}
                onDragStart={(e) => drugStartHandle(e, board, launch)}
                onDrop={(e) => dropHandle(e, board)}
                draggable={!board.isViewMode}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar alt={launch.name} src={launch.links.patch.small} />
                  }
                  title={launch.name}
                  description={launch.description || "..."}
                />
              </List.Item>
            )}
          />
        </div>
      ))}
    </div>
  );
};
