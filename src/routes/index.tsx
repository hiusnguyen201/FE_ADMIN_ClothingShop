import { useLocation, useRoutes } from "react-router-dom";
import { publicRoutes } from "./public.routes";
import { privateRoutes } from "./private.routes";

export const Router = () => {
  return useRoutes([...publicRoutes, ...privateRoutes]);
};
