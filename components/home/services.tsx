"use client";
import { motion, easeOut } from "framer-motion";
import { useState } from "react";
import ServicesTileGrid from "./services-tile-grid";
import { ServicesTabBar } from "./services-tab-bar";
import { SERVICE_CATEGORIES } from "../constants/service-categories";

export default function Services() {
  const [activeId, setActiveId] = useState(SERVICE_CATEGORIES[0].id);

  const active =
    SERVICE_CATEGORIES.find((c) => c.id === activeId) ?? SERVICE_CATEGORIES[0];
  const transition = { duration: 0.8, ease: easeOut };

  return (
    <section
      id="services"
      className="relative min-h-screen border lg:px-24 md:px-12 sm:px-4 xs:px-2 pt-32 pb-24"
    >
      <div className="max-w-337.5 mx-auto px-6 lg:px-12  sm:justify-center sm:items-center lg:block sm:flex flex-col">
        {/* Header */}
        <div className="flex flex-col gap-8 mb-12 lg:mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={transition}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2
                className={`text-4xl  text-foreground lg:text-6xl md:text-6xl sm:text-6xl xs:text-5xl xs:text-center lg:text-start font-display tracking-tight transition-all duration-700 `}
              >
                Our{" "}
                <span className="text-sky-800 dark:text-cyan-400">
                  Services.
                </span>
              </h2>
            </motion.div>
          </div>
        </div>
        <ServicesTabBar
          categories={SERVICE_CATEGORIES}
          activeId={activeId}
          onSelect={setActiveId}
        />
        <ServicesTileGrid tiles={active.tiles} categoryLabel={active.label} />
      </div>
    </section>
  );
}
