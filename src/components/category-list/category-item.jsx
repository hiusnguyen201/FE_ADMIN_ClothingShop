import { Link } from "react-router-dom";
import { LazyImage } from "@/components/lazy-image";
import { cn } from "@/lib/utils";

export const CategoryItem = ({ to, className }) => {
  return (
    <div className={cn("p-2", className)}>
      <Link
        to={to}
        className="w-full h-full overflow-hidden md:rounded-3xl rounded-2xl block"
      >
        <LazyImage
          className="w-full h-full hover:scale-105 duration-500"
          src="https://media3.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/November2024/mceclip2_10.jpg"
        />
      </Link>
    </div>
  );
};
