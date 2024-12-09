import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LazyImage } from "./lazy-image";
import { useRef } from "react";
import { Link } from "react-router-dom";

const data = [
  "https://media3.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/December2024/Hero_Banner_-_Desktop_LDDD.jpg",
  "https://media3.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/October2024/1920_x_788_hero_banner2.jpg",
  "https://media3.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/November2024/Hero_Banner_-_Desktop_2_KW.jpg",
];

export function Banner() {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[plugin.current]}
      className="w-full relative"
    >
      <Link to="/collections">
        <CarouselContent>
          {data.map((item) => (
            <LazyImage className="w-[100vw]" src={item} />
          ))}
        </CarouselContent>
      </Link>
      <CarouselPrevious className="absolute left-0 px-12 h-full bg-[transparent] hover:bg-[transparent] hover:text-[#fff] hover:opacity-60 text-[#fff] border-none rounded-none" />
      <CarouselNext className="absolute right-0 px-12 h-full bg-[transparent] hover:bg-[transparent] hover:text-[#fff] hover:opacity-60 text-[#fff] border-none rounded-none" />
    </Carousel>
  );
}
