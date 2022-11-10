import React from "react";
import { Provider } from "react-redux";

import { Board } from "./components";
import { store } from "./store";

import "./App.style.scss";

export const App = () => {
  return (
    <Provider store={store}>
      <Board />
    </Provider>
  );
};
