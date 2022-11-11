import { FC, useLayoutEffect } from "react";

import { getAllLaunches, useAppDispatch } from "../../store";

export const InitiComponent: FC = () => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(getAllLaunches());
  }, [dispatch]);

  return null;
};
