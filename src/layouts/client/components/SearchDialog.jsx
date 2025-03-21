import { Link } from "react-router-dom";
import { Content, Close } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, XIcon } from "lucide-react";
import SearchForm from "./SearchForm";
import ProductCard from "@/components/custom/product-card";
import { Fragment } from "react";

const data = [1, 23, 4, 4];

export default function SearchDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="opacity-60" />
        <Content
          className={
            "right-0 fixed left-0 top-0 z-50 md:h-[var(--header-height-md)] h-[var(--header-height)] bg-background shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-1/2 data-[state=open]:slide-in-from-top-1/2"
          }
        >
          <DialogTitle className="sr-only">Search</DialogTitle>
          <DialogDescription className="sr-only">Search</DialogDescription>
          {/* Search form */}
          <div className="px-4 flex items-center h-full relative max-w-[500px] mx-auto">
            <Close className="md:hidden flex">
              <ChevronLeftIcon />
              <span className="sr-only">Close</span>
            </Close>
            <div className="flex-1 relative flex items-center">
              <SearchForm />
              <Close className="hidden md:block absolute -right-[100px] h-full">
                <XIcon />
                <span className="sr-only">Close</span>
              </Close>
            </div>
          </div>
          {/* Products */}
          <div className="hidden lg:block mt-2 bg-[#fff] max-w-[1000px] mx-auto rounded p-12 px-20">
            {data.length > 0 ? (
              <Fragment>
                <Label className="font-bold block">Sản phẩm</Label>
                <div className="flex items-center -mx-2">
                  {data.map((item, index) => (
                    <ProductCard className="w-1/4" key={index} product={item} />
                  ))}
                </div>
                <Link to="#" className="text-center block">
                  <Button className="bg-[#273bcd] rounded-full px-6">
                    Xem tất cả
                  </Button>
                </Link>
              </Fragment>
            ) : (
              <p className="text-center">Không tìm thấy kết quả phù hợp!</p>
            )}
          </div>
        </Content>
      </DialogPortal>
    </Dialog>
  );
}
