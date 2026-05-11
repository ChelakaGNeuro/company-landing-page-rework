"use client";

import { useEffect, useState, useRef } from "react";
import {
  animate,
  useMotionValue,
  useInView,
  easeOut,
  motion,
} from "motion/react";

function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
}: {
  end: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsubscribe = motionValue.on("change", (v) => {
      setDisplay(Math.floor(v));
    });
    return unsubscribe;
  }, [motionValue]);

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, end, {
        duration: 2,
        ease: easeOut,
      });

      return controls.stop;
    }
  }, [isInView, end, motionValue]);

  return (
    <div
      ref={ref}
      className="text-6xl lg:text-7xl md:text-6xl sm:text-6xl xs:text-5xl font-display tracking-tight sm:justify-center sm:items-center sm:flex xs:justify-center xs:items-center xs:flex  lg:block"
    >
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </div>
  );
}

const metrics = [
  {
    value: 560,
    suffix: "+",
    prefix: "",
    label: "Successfully completed projects",
  },
  {
    value: 97,
    suffix: ".50%",
    prefix: "",
    label: "Customer satisfaction",
  },
  {
    value: 23,
    suffix: "+",
    prefix: "",
    label: "Over partnerships",
  },
  {
    value: 3,
    suffix: "+",
    prefix: "",
    label: "years of industry experience",
  },
];

export function Statistics() {
  return (
    <section
      id="studio"
      className="relative  border lg:px-24 md:px-12 sm:px-4 xs:px-2 pt-32 pb-24 "
    >
      <div className="max-w-[1350px] mx-auto px-6 lg:px-12 xs:px-2 sm:justify-center sm:items-center xs:justify-center xs:items-center lg:block sm:flex flex-col">
        {/* Header */}
        <motion.div
          className="flex flex-col gap-8 mb-12 lg:mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          <h2
            className="text-4xl sm:text-6xl lg:text-6xl xs:text-center lg:text-start text-foreground font-display tracking-tight"
          >
            Built on{" "}
            <span className="text-sky-800 dark:text-cyan-400">Trust.</span>
            <br />
            Driven by{" "}
            <span className="text-sky-800 dark:text-cyan-400">Results.</span>
          </h2>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 items-center justify-center gap-px bg-background/10">
          {metrics.map((metric, index) => (
             <motion.div
              key={metric.label}
              className="bg-background xs:px-4 py-8 lg:p-12"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                ease: easeOut,
                delay: index * 0.1,
              }}
            >
              <AnimatedCounter
                end={metric.value}
                suffix={metric.suffix}
                prefix={metric.prefix}
              />
              <div className="mt-4 text-2xl md:text-2xl text-muted-foreground justify-center items-center sm:flex xs:text-xl xs:justify-center xs:items-center xs:flex  lg:block">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
