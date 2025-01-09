// lazy image
import "lazysizes";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./global.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./lib/store";
import { Toaster } from "./components/ui/toaster";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </BrowserRouter>
);
