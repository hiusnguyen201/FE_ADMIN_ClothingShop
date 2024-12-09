import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function HomeLayout() {
  return (
    <div className="relative">
      <Header />
      <main className="mt-[var(--header-height)]">
        <p>asccsacsa</p>
        <p>asccsacsa</p>
        <p>asccsacsa</p>
        <p>asccsacsa</p>
        <p>asccsacsa</p>
        <p>asccsacsa</p>
        <p>asccsacsa</p>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
