import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { store } from "@/redux/store";
import App from "@/App";
import "./global.css";

createRoot(document.getElementById("root")!).render(
  <ReduxProvider store={store}>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </ReduxProvider>
);
