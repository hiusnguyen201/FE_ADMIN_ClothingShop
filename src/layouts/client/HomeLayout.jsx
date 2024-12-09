import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function HomeLayout() {
  return (
    <div className="relative">
      <Header />
      <main
        style={{
          marginTop: "calc(var(--header-height) - 1px)",
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
