import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/product-card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export function ProductSlides({
  title,
  className,
  data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
}) {
  const plugin = useRef(
    Autoplay({ delay: 10000, stopOnInteraction: true })
  );

  return (
    <section className="mt-16 px-4 2xl:px-16 flex flex-col items-center">
      <div className="w-full">
        {/* Header Slide */}
        <div className="mb-2 flex items-center justify-between">
          <h2 className="uppercase font-medium text-xl md:text-2xl">
            {title}
          </h2>
          <Link to="#" className="md:block hidden underline">
            Xem Thêm
          </Link>
        </div>
        {/* Slider */}
        <div className="-mx-2">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              plugin: [plugin.current],
              slidesToScroll: null, // set null -> auto base on basis item
            }}
            className={cn("w-full", className)}
          >
            <CarouselContent className="m-0">
              {data.map((_, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/2 sm:basis-1/4 xl:basis-1/5 p-0"
                >
                  <ProductCard className="p-1 md:p-2" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              variant="default"
              className="2xl:-left-10 left-0 p-5"
            />
            <CarouselNext
              variant="default"
              className="2xl:-right-10 right-0 p-5"
            />
          </Carousel>
        </div>
        {/* More Btn */}
        <div className="md:hidden block text-center mt-4 mb-8">
          <Link to="#">
            <Button
              className="min-w-[100px] rounded-full"
              variant="outline"
            >
              More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
