"use client";

import { easeOut, motion } from "framer-motion";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { ContactForm } from "./contact-form";
import { CONTACT_INFO, MAP_EMBED_URL, SECTION } from "./config";

const ICON_MAP: Record<string, React.ElementType> = {
  Email: MailIcon,
  Phone: PhoneIcon,
  Office: MapPinIcon,
};

const transition = { duration: 0.8, ease: easeOut };

function stagger(i: number) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    transition: { ...transition, delay: i * 0.08 },
    viewport: { once: true, amount: 0.2 },
  };
}

export default function ContactUs() {
  return (
    <section
      id="contact-us"
      className="relative min-h-screen border lg:px-24 md:px-12 sm:px-4 pt-32 pb-24"
    >
      <div className="max-w-337.5 mx-auto px-6 lg:px-12 sm:justify-center sm:items-center lg:block sm:flex flex-col">
        {/* Header */}
        <div className="flex flex-col gap-8 mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transition}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl text-foreground lg:text-6xl md:text-6xl sm:text-6xl font-display tracking-tight">
              {SECTION.heading.base}
              <span className="text-sky-800 dark:text-cyan-400">
                {SECTION.heading.accent}
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              {SECTION.subheading}
            </p>
          </motion.div>
        </div>

        {/* Content grid */}
        <div className="sm:w-full grid grid-cols-1 sm:grid-cols-5 sm:grid-rows-2 lg:grid-rows-1 lg:grid-cols-5 gap-12 lg:gap-20">
          <div className="sm:col-span-5 md:col-span-3 lg:col-span-3 ">
            <ContactForm />
          </div>

          {/* Contact info */}
          <div className="sm:col-span-5 md:col-span-2 lg:col-span-2 flex flex-col gap-8">
            {CONTACT_INFO.map(
              ({ LABEL: label, VALUE: value, HREF: href }, i) => {
                const Icon = ICON_MAP[label];
                return (
                  <motion.div
                    key={label}
                    {...stagger(i)}
                    className="flex gap-4 items-start"
                  >
                    <div className="shrink-0 size-10 rounded-lg border flex items-center justify-center bg-muted/30 hover:bg-muted transition-colors">
                      <Icon className="size-4 text-primary dark:text-primary " />
                    </div>
                    <div className="hover:text-foreground dark:hover:text-foreground">
                      <div className="text-sm text-muted-foreground  mb-0.5">
                        {label}
                      </div>
                      {href ? (
                        <a
                          href={href}
                          className="text-foreground hover:text-foreground dark:hover:text-foreground text-shadow-2xs transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="text-foreground whitespace-pre-line">
                          {value}
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              },
            )}

            <motion.div
              {...stagger(CONTACT_INFO.length)}
              className="w-full overflow-hidden rounded-xl border"
            >
              <iframe
                src={MAP_EMBED_URL}
                className="w-full h-56"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office location"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
