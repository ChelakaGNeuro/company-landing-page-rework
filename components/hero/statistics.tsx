"use client";

import { useEffect, useState, useRef } from "react";
import { animate, useMotionValue, useInView, easeOut } from "motion/react";

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
      className="text-6xl lg:text-8xl md:text-6xl sm:text-6xl font-display tracking-tight sm:justify-center sm:items-center sm:flex lg:block"
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
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="studio"
      ref={sectionRef}
      className="relative min-h-screen border lg:px-24 md:px-12 sm:px-4 pt-32 pb-24 "
    >
      <div className="max-w-[1350px] mx-auto px-6 lg:px-12 sm:justify-center sm:items-center lg:block sm:flex flex-col">
        {/* Header */}
        <div className="flex flex-col gap-8 mb-12 lg:mb-12">
          <div>
            <h2
              className={`text-4xl  text-foreground lg:text-6xl md:text-6xl sm:text-6xl font-display tracking-tight transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Built on{" "}
              <span className="text-sky-800 dark:text-cyan-400">Trust.</span>
              <br />
              <div className="">
                Driven by{" "}
                <span className="text-sky-800 dark:text-cyan-400">
                  Results.
                </span>
              </div>
            </h2>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 items-center justify-center gap-px bg-background/10">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`bg-background  p-8 lg:p-12 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <AnimatedCounter
                end={typeof metric.value === "number" ? metric.value : 0}
                suffix={metric.suffix}
                prefix={metric.prefix}
              />
              <div className="mt-4 text-2xl md:text-2xl text-muted-foreground justify-center items-center sm:flex lg:block">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
