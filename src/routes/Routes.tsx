import React, { FC } from "react";
import { Routes as RoutesReact, Route } from "react-router-dom";

import { Board, NotPage, Card } from "../pages";

export const Routes: FC = () => {
  return (
    <RoutesReact>
      <Route path="/" element={<Board />} />
      <Route path="/card/:id" element={<Card />} />

      <Route path="*" element={<NotPage />} />
    </RoutesReact>
  );
};
