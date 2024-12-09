import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LazyImage } from "@/components/lazy-image";

export default function ProductCard({ product, className }) {
  return (
    <div className={cn("p-2 text-sm space-y-1", className)}>
      <div className="relative">
        <Badge className="absolute z-10 right-2 top-2 bg-[#F95D03] hover:bg-[#F95D03]">
          SALE
        </Badge>
        <Link className="relative block" to="#">
          <LazyImage
            className="object-cover rounded-lg h-full mb-2 w-full max-h-[250px]"
            src="https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/September2023/chubby_corgi--2.jpg"
          />
        </Link>
      </div>
      <div className="flex flex-col gap-1 min-h-[94px]">
        <Link to="#">
          <p className="line-clamp-2">Áo Thun Nam C&S Cat Mama 1</p>
        </Link>
        <p
          style={{
            fontSize: 13,
          }}
          className="text-[#00000099]"
        >
          Cat & Dog
        </p>
        <div className="flex items-center gap-2">
          <span className="font-bold">199.000đ</span>
          <span className="text-[#c4c4c4] line-through">229.000đ</span>
          <Badge className="bg-[#273bcd] hover:bg-[#273bcd]">-13%</Badge>
        </div>
      </div>
    </div>
  );
}
