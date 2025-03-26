import { LoginPage } from "@/pages/auth/LoginPage";
// import RegisterPage from "@/pages/auth/RegisterPage";

export const publicRoutes = [
  {
    children: [
      { path: "/login", element: <LoginPage /> },
      //   { path: "/register", element: <RegisterPage /> },
    ],
  },
];
