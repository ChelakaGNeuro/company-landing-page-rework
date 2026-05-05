"use client";

import { useEffect, useState, useRef } from "react";

function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
}: {
  end: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const start = 0;
          const duration = 7000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <div
      ref={ref}
      className="text-6xl lg:text-8xl md:text-6xl sm:text-6xl font-display tracking-tight sm:justify-center sm:items-center sm:flex lg:block"
    >
      {prefix}
      {count.toLocaleString()}
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
      className="relative  lg:px-24 md:px-12 sm:px-4 py-24 border-y border-foreground/10"
    >
      <div className="max-w-[1350px] mx-auto px-6 lg:px-12 sm:justify-center sm:items-center lg:block sm:flex flex-col">
        {/* Header */}
        <div className="flex flex-col gap-8 mb-16 lg:mb-24">
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
              Driven by{" "}
              <span className="text-sky-800 dark:text-cyan-400">Results.</span>
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
