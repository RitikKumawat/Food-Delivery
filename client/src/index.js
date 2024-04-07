import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App, { appRouter } from "./App";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { Toaster } from "react-hot-toast";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer:appStore,
})
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
      <Toaster/>
    </BrowserRouter>
  </Provider>
);
