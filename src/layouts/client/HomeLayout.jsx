import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function HomeLayout() {
  return (
    <div className="relative">
      <Header />
      <main className="mt-[var(--header-height)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
