// lazy image
import "lazysizes";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./global.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./lib/store";

createRoot(document.getElementById("root")).render(
  <Provider store= {store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
);
