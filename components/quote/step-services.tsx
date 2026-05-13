"use client";

import { Building2, Lock, Monitor, Server, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ServiceKey, QuoteFormData } from "./types";

const SERVICES = [
  {
    key: "facade" as ServiceKey,
    icon: Building2,
    label: "Facade Solutions",
    description: "Aluminium doors, windows, curtain walls, cladding, glass work",
  },
  {
    key: "access" as ServiceKey,
    icon: Lock,
    label: "Access Solutions",
    description: "Roller doors, shutters, gates, roofing, railings",
  },
  {
    key: "digital" as ServiceKey,
    icon: Monitor,
    label: "Digital Solutions",
    description: "Websites, e-commerce, ERP, POS platforms",
  },
  {
    key: "it" as ServiceKey,
    icon: Server,
    label: "IT Infrastructure",
    description: "Networking, security, servers, hardware",
  },
];

interface Props {
  data: QuoteFormData;
  onChange: (services: ServiceKey[]) => void;
  error?: string;
  compact?: boolean;
}

export function StepServices({ data, onChange, error, compact }: Props) {
  const selected = data.services;

  function toggle(key: ServiceKey) {
    if (selected.includes(key)) {
      onChange(selected.filter((k) => k !== key));
    } else {
      onChange([...selected, key]);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          What can we help you with?
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Select all that apply.</p>
      </div>

      <div className={cn("grid gap-3", compact ? "grid-cols-1" : "grid-cols-2")}>
        {SERVICES.map((service, i) => {
          const isSelected = selected.includes(service.key);
          return (
            <motion.button
              key={service.key}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.25 }}
              onClick={() => toggle(service.key)}
              className={cn(
                "relative flex flex-col gap-2.5 p-4 rounded-xl border-2 text-left transition-all",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                isSelected
                  ? "border-foreground bg-popover"
                  : "border-foreground/30 bg-popover/40 hover:border-foreground/60"
              )}
              aria-pressed={isSelected}
              aria-label={service.label}
            >
              {isSelected && (
                <span className="absolute top-3 right-3 flex items-center justify-center size-5 rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3" strokeWidth={3} />
                </span>
              )}
              <service.icon
                className={cn(
                  "size-5 shrink-0",
                  isSelected ? "text-foreground" : "text-muted-foreground"
                )}
              />
              <div>
                <p
                  className={cn(
                    "text-sm font-semibold leading-snug",
                    isSelected ? "text-foreground " : "text-foreground"
                  )}
                >
                  {service.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                  {service.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {selected.length > 0 && !error && (
          <motion.p
            key="count"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-foreground  font-medium"
          >
            {selected.length} service{selected.length > 1 ? "s" : ""} selected
          </motion.p>
        )}
        {error && (
          <motion.p
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm text-destructive"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
