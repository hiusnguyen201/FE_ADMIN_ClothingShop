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

export function BannerSlides({ className, data }) {
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
