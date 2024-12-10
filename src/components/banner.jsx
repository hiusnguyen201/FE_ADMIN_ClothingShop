import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  CarouselItem,
} from "@/components/ui/carousel";
import { LazyImage } from "./lazy-image";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const data = [
  "https://media3.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/December2024/Hero_Banner_-_Desktop_LDDD.jpg",
  "https://media3.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/October2024/1920_x_788_hero_banner2.jpg",
  "https://media3.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/November2024/Hero_Banner_-_Desktop_2_KW.jpg",
];

export function Banner({ className }) {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[plugin.current]}
      className={cn("w-full relative", className)}
    >
      <Link to="/collections" className="block h-full">
        <CarouselContent className="h-full w-full m-0">
          {data.map((item, index) => (
            <CarouselItem key={index} className="p-0 relative">
              <LazyImage
                className="h-full w-full object-cover"
                src={item}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Link>
      <CarouselPrevious className="absolute z-10 left-0 px-12 py-24 bg-[transparent] hover:bg-[transparent] hover:text-[#fff] hover:opacity-60 text-[#fff] border-none rounded-none" />
      <CarouselNext className="absolute z-10 right-0 px-12 py-24 bg-[transparent] hover:bg-[transparent] hover:text-[#fff] hover:opacity-60 text-[#fff] border-none rounded-none" />
    </Carousel>
  );
}
