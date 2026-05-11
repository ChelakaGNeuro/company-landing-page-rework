"use client";
import { motion, easeOut } from "framer-motion";
import { WorkCarousel } from "./work-carousel";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export function Work() {
  const transition = { duration: 0.8, ease: easeOut };

  return (
    <section
      id="work"
      className="relative lg:px-24 md:px-12 sm:px-4 xs:px-2 pb-24 pt-32 "
    >
      <div className="max-w-[1350px] mx-auto px-6 lg:px-12  sm:justify-center sm:items-center xs:justify-center xs:items-center lg:block sm:flex flex-col">
        {/* Header */}
        <div className="flex flex-col gap-8 mb-16 lg:mb-16">
          <motion.div
            className="text-4xl lg:text-6xl font-display tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transition}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2
              className={`text-4xl text-foreground lg:text-6xl md:text-6xl sm:text-6xl xs:text-5xl xs:text-center lg:text-start font-display tracking-tight transition-all duration-700 `}
            >
              Showcasing Our{" "}
              <span className=" text-sky-800 dark:text-cyan-400">
                Expertise.
              </span>
            </h2>
          </motion.div>
        </div>
        <div className="relative flex justify-center items-center">
          <WorkCarousel />
        </div>
        <div className="flex justify-center mt-8">
          <Button variant={"outline"} size={"lg"} onClick={() => null}>
            See more of our work <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
