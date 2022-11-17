import React from "react";
import { Provider } from "react-redux";

import { Header, InitComponent } from "./components";
import { Routes } from "./routes";

import { store } from "./store";

import "./App.style.scss";
import "./styles/custom-ant.scss";

export const App = () => {
  return (
    <Provider store={store}>
      <InitComponent />
      <Header />
      <Routes />
    </Provider>
  );
};
