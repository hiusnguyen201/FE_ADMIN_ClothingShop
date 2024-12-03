import { Content, Close } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, SearchIcon, XIcon } from "lucide-react";

const data = [
  {
    title: "Áo Thun Nam C&S Cat Mama 1",
    category: "Cat & Dog",
  },
  {
    title: "Áo Thun Nam C&S Cat Mama 2",
    category: "Cat & Dog",
  },
  {
    title: "Áo Thun Nam C&S Cat Mama 3",
    category: "Cat & Dog",
  },
  {
    title: "Áo Thun Nam C&S Cat Mama 4",
    category: "Cat & Dog",
  },
];

export default function SearchDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="opacity-60" />
        <Content
          className={
            "right-0 fixed left-0 top-0 z-50 h-[107px] bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-1/2 data-[state=open]:slide-in-from-top-1/2"
          }
        >
          <DialogTitle className="sr-only">Search</DialogTitle>
          <DialogDescription className="sr-only">Search</DialogDescription>
          <div className="flex px-4 gap-1 items-center h-full relative max-w-[500px] mx-auto">
            <Close className="p-2">
              <ChevronLeftIcon className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </Close>
            <div className="flex-1 relative flex items-center gap-1">
              <Input
                type="name"
                className="pr-8"
                placeholder="Tìm kiếm sản phẩm..."
              />
              <div className="absolute right-2 rounded-full bg-[#c4c4c4] text-[#fff] cursor-pointer">
                <XIcon className="w-4 h-4 p-0.5" />
              </div>
            </div>
            <Button className="px-3">
              <SearchIcon />
            </Button>
          </div>
          <div className="hidden lg:block mt-2 bg-[#fff] max-w-[1000px] mx-auto rounded p-12 px-20">
            <Label>Sản phẩm</Label>
            <div className="flex items-center -mx-2">
              {data.map((item) => (
                <div
                  key={item.title}
                  className="w-1/4 p-2 text-sm space-y-1"
                >
                  <Link className="relative block" to="#">
                    <Badge className="absolute right-2 top-2 bg-[#F95D03]">
                      SALE
                    </Badge>

                    <img
                      className="object-cover rounded-lg h-[260px] mb-2"
                      src="https://images.unsplash.com/photo-1719937050640-71cfd3d851be?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                  </Link>
                  <div className="min-h-24">
                    <Link to="#">{item.title}</Link>
                    <p
                      style={{
                        fontSize: 13,
                      }}
                      className="text-[#00000099]"
                    >
                      {item.category}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">199.000đ</span>
                      <span className="text-[#c4c4c4] line-through">
                        229.000đ
                      </span>
                      <Badge>-13%</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="#" className="text-center block">
              <Button>Xem tất cả</Button>
            </Link>
          </div>
        </Content>
      </DialogPortal>
    </Dialog>
  );
}
