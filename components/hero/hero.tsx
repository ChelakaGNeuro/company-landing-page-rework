"use client";

import { motion, cubicBezier } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const textRevealVariants = {
  hidden: { y: "100%" },
  visible: (i: number) => ({
    y: 0,
    transition: {
      duration: 0.8,
      ease: cubicBezier(0.22, 1, 0.36, 1),
      delay: i * 0.1,
    },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero.webm" type="video/webm" />
      </video>
      {/* Overlay (for readability) */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Headline */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold block overflow-hidden mb-4">
          <span>
            <motion.span
              className="block"
              variants={textRevealVariants}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <span style={{ color: "#0dcaf0" }}> GN</span>euro Engineering
            </motion.span>
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-2xl max-w-xl block overflow-hidden mb-8">
          <span>
            <motion.span
              className="block leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              custom={2}
            >
              Experts in
              <span style={{ color: "#0dcaf0" }}>
                {" "}
                Constructions and IT
              </span>{" "}
              Services
            </motion.span>
          </span>
        </p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button
            size="lg"
            className="shimmer-btn bg-white text-zinc-950 hover:bg-zinc-200 rounded-full px-8 h-12 text-base font-medium shadow-lg shadow-white/10"
          >
            Start Building
            <ArrowDown className="ml-2 w-4 h-4" />
          </Button>
          
        </motion.div>
      </div>
    </section>
  );
}
