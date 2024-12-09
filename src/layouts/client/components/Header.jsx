import { Link } from "react-router-dom";
import { useState } from "react";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
  SquareIcon,
  User2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchDialog from "./SearchDialog";

const data = {
  nav: [
    { name: "Sản phẩm" },
    { name: "Đồ lót" },
    { name: "Đồ thể thao" },
    { name: "Mặc hàng ngày" },
    { name: "Care&Share" },
    { name: "Care&Share3" },
    { name: "Care&Share2" },
  ],
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  return (
    <header className="fixed top-0 right-0 left-0 flex items-center justify-between px-4 md:px-8 h-[var(--header-height)] border-b bg-[#212121] text-[#fff]">
      <div className="flex w-full items-center h-full">
        {/* Logo */}
        <div className="flex w-full order-2 md:w-1/3">
          <Link
            to="/"
            className="flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <SquareIcon />
          </Link>
        </div>
        <div className="md:w-3/3 order-1 md:order-2">
          {/* Mobile */}
          <div className="md:hidden flex gap-1">
            <Button variant="ghost" size="icon">
              <MenuIcon />
            </Button>
            <Button variant="ghost" size="icon" onClick={openDialog}>
              <SearchIcon />
            </Button>
          </div>
          {/* Navbar */}
          <div className="hidden justify-center md:flex h-full">
            {data.nav.map((item) => (
              <Link
                key={item.name}
                href="#"
                className="text-xs lg:text-sm font-[500]"
              >
                <Button variant="ghost" className="rounded-none">
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        {/* Actions */}
        <div className="flex items-center justify-end md:w-2/3 gap-1 order-3">
          <Button
            onClick={openDialog}
            variant="ghost"
            size="icon"
            className="md:flex hidden"
          >
            <SearchIcon />
          </Button>
          <Button variant="ghost" size="icon">
            <User2Icon />
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingCartIcon />
          </Button>
        </div>
      </div>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </header>
  );
}
