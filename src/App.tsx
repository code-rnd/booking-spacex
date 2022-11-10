import React from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { Board, Card, NotPage } from "./components";
import { store } from "./store";

import "./App.style.scss";

export const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/card/:id" element={<Card />} />

        <Route path="*" element={<NotPage />} />
      </Routes>
    </Provider>
  );
};
