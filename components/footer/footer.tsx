"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const footerLinks = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap", "API"],
  Resources: ["Documentation", "Guides", "Blog", "Community", "Templates"],
  Company: ["About", "Careers", "Press", "Partners", "Contact"],
  Legal: ["Privacy", "Terms", "Security", "Cookies", "Licenses"],
};

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} className="border-t border-zinc-800 bg-zinc-950 lg:px-24 md:px-12 sm:px-4 xs:px-4">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-6 gap-8"
        >
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <span className="text-zinc-950 font-bold text-sm">G</span>
              </div>
              <span className="font-semibold text-white">
                GNeuro Engineering
              </span>
            </a>
            <p className="text-sm text-zinc-500 mb-4">
              Delivering quality across construction and IT — engineered
              structures, intelligent systems, and the people who build them.
            </p>
          </div>
          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} GNeuro Engineering (Pvt) Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-zinc-500 hover:text-white transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-sm text-zinc-500 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-sm text-zinc-500 hover:text-white transition-colors"
            >
              Discord
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
