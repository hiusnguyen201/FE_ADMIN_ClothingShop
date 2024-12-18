import { Link } from "react-router-dom";
import { motion, useAnimation } from "motion/react";
import { cn } from "@/lib/utils";
import { LazyImage } from "@/components/lazy-image";
import { ProductBadge } from "@/components/product-slides/product-badge";
import { ColorBadge } from "@/components/product-slides/color-badge";
import { Button } from "@/components/ui/button";
import { SizeBadge } from "@/components/product-slides/size-badge";

export function ProductCard({ product, className }) {
  const controls = useAnimation();

  const handleHoverStart = () => {
    controls.start({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    });
  };

  const handleHoverEnd = () => {
    controls.start({
      y: 12,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    });
  };

  return (
    <div
      className={cn(
        "p-2 md:text-sm text-xs space-y-1 select-none",
        className
      )}
    >
      <motion.div
        className="relative"
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
      >
        <div className="absolute z-10 right-2 left-2 top-2 flex items-center justify-end flex-wrap gap-1">
          <ProductBadge title="-13%" className="md:hidden flex" />
          <ProductBadge title="NEW" />
        </div>
        <Link className="relative block" to="#">
          <LazyImage
            className="object-cover rounded-lg h-full mb-2 w-full h-auto aspect-[3/4]"
            src="https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/September2023/chubby_corgi--2.jpg"
          />
        </Link>
        <motion.div
          animate={controls}
          initial={{
            y: 12,
            opacity: 0,
          }}
          style={{
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, .1), rgba(0, 0, 0, .1)), hsla(0, 0%, 100%, .4)",
          }}
          className="absolute p-3 mx-auto h-auto backdrop-blur-sm bottom-6 left-6 right-6 rounded md:block hidden"
        >
          <p className="text-sx mb-2 text-center">Thêm vào giỏ hàng +</p>
          <div className="flex flex-wrap gap-1">
            <SizeBadge title="S" />
            <SizeBadge title="M" />
            <SizeBadge title="L" />
            <SizeBadge title="XL" />
            <SizeBadge title="2XL" />
          </div>
        </motion.div>
      </motion.div>
      <div className="flex flex-col min-h-[94px]">
        <div className="flex mb-2 items-center gap-1 sm:gap-2 flex-wrap">
          <ColorBadge color="#000" active />
          <ColorBadge color="#ffffff" />
          <ColorBadge color="#9FC5E8" />
        </div>
        <Link to="#">
          <p className="line-clamp-2 mb-1">Áo Thun Nam C&S Cat Mama 1</p>
        </Link>
        <div className="flex items-center gap-2">
          <span className="font-bold">199.000đ</span>
          <span className="text-[#c4c4c4] line-through">229.000đ</span>
          <ProductBadge title="-13%" className="hidden md:flex" />
        </div>
      </div>
    </div>
  );
}
