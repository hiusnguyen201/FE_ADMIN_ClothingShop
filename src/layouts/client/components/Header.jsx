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
  ],
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(true);

  return (
    <header className="fixed relative flex items-center justify-between px-4 md:px-6 h-[80px] border-b bg-[#212121] text-[#fff]">
      <SearchDialog open={open} onOpenChange={setOpen} />
      <div className="flex w-full items-center h-full">
        <div className="flex w-full order-2 md:w-1/3">
          <Link
            to="/"
            className="flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <SquareIcon />
          </Link>
        </div>
        <div className="md:w-2/3 order-1 md:order-2">
          <div className="md:hidden flex gap-1">
            <Button variant="ghost" size="icon">
              <MenuIcon />
            </Button>
            <Button variant="ghost" size="icon" onClick={openDialog}>
              <SearchIcon />
            </Button>
          </div>
          <div className="hidden justify-center md:flex h-full">
            {data.nav.map((item) => (
              <Link
                key={item.name}
                href="#"
                className="text-xs lg:text-sm font-[500]"
              >
                <Button variant="ghost">{item.name}</Button>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex justify-end md:w-1/3 gap-1 order-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:flex hidden"
            onClick={openDialog}
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
    </header>
  );
}
