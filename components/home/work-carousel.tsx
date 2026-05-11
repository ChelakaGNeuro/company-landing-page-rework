"use client";

import * as React from "react";
import Image from "next/image";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Badge } from "../ui/badge";
import Autoplay from "embla-carousel-autoplay";
import { motion, easeOut } from "framer-motion";
import { WORK_CAROUSEL_ITEMS } from "../constants/work-carousel-data";

export function WorkCarousel() {
  const transition = { duration: 0.8, ease: easeOut };
  const [api, setApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={transition}
      viewport={{ once: true, amount: 0.3 }}
      className="w-full min-w-0 overflow-hidden"
    >
      <div
        className="w-full min-w-0 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        <Carousel
          className="w-full min-w-0"
          setApi={setApi}
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
          opts={{
            loop: true,
            align: "center",
            slidesToScroll: 1,
            containScroll: false,
          }}
        >
          <CarouselContent className="-ml-4 items-center">
            {WORK_CAROUSEL_ITEMS.map((item, index) => {
              const isActive = selectedIndex === index;

              return (
                <CarouselItem
                  key={index}
                  className="pl-4 basis-[280px] sm:basis-auto"
                >
                  <div className="relative h-auto xs:h-100 w-full sm:h-80 sm:w-auto md:h-95 lg:h-120">
                    <Image
                      src={item.SRC}
                      alt={`Work carousel image ${index + 1}`}
                      width={500}
                      height={460}
                      className="h-full w-full object-cover sm:w-auto sm:object-contain block rounded-4xl"
                    />
                    <div>
                      <Badge
                        variant={"secondary"}
                        className="pointer-events-none absolute top-4 right-4"
                      >
                        {item.CATEGORY}
                      </Badge>
                    </div>

                    <div
                      className={`pointer-events-none absolute bottom-4 left-4 right-4 rounded-2xl bg-background/60 p-4 text-foreground backdrop-blur-sm transition-all duration-400 ${
                        isActive
                          ? "translate-y-0 opacity-100"
                          : "translate-y-3 opacity-0"
                      }`}
                      aria-hidden={!isActive}
                    >
                      <h3 className="text-lg font-semibold leading-tight sm:text-xl">
                        {item.TITLE}
                      </h3>
                      <p className="mt-1 text-sm text-foreground/90 sm:text-base">
                        {item.DESCRIPTION}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </motion.div>
  );
}
