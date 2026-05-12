"use client";

import { useState } from "react";
import { CheckCircle2, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { QuoteFormData } from "./types";

const SERVICE_LABELS: Record<string, string> = {
  facade: "Facade Solutions",
  access: "Access Solutions",
  digital: "Digital Solutions",
  it: "IT Infrastructure",
};

const CONTACT_METHOD_LABELS: Record<string, string> = {
  phone: "Phone",
  email: "Email",
  whatsapp: "WhatsApp",
};

interface Props {
  data: QuoteFormData;
  referenceId: string;
  onClose: () => void;
}

export function StepConfirm({ data, referenceId, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  const firstName = data.fullName.trim().split(" ")[0];

  function copyRef() {
    navigator.clipboard.writeText(referenceId).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-5 items-center text-center py-2"
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
        className="flex items-center justify-center size-16 rounded-full bg-sky-100 dark:bg-cyan-950/60"
      >
        <CheckCircle2 className="size-8 text-sky-700 dark:text-cyan-400" />
      </motion.div>

      {/* Heading */}
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Thanks{firstName ? `, ${firstName}` : ""}!
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Your quote request has been received.
        </p>
      </div>

      {/* Reference ID */}
      <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-4 py-2.5">
        <span className="text-sm font-mono font-medium text-foreground">
          {referenceId}
        </span>
        <button
          type="button"
          onClick={copyRef}
          className="flex items-center gap-1 rounded p-1 hover:bg-muted transition-colors"
          aria-label="Copy reference ID"
        >
          {copied ? (
            <Check className="size-3.5 text-sky-700 dark:text-cyan-400" />
          ) : (
            <Copy className="size-3.5 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Follow-up message */}
      <p className="text-sm text-muted-foreground">
        Our team will contact you within 24 business hours via{" "}
        <span className="font-medium text-foreground">
          {CONTACT_METHOD_LABELS[data.contactMethod]}
        </span>
        .
      </p>

      {/* Services summary */}
      <div className="w-full rounded-xl border border-border bg-muted/30 p-4 text-left">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2.5">
          Services requested
        </p>
        <div className="flex flex-col gap-1.5">
          {data.services.map((s) => (
            <div key={s} className="flex items-center gap-2.5">
              <div className="size-1.5 rounded-full bg-sky-700 dark:bg-cyan-400 shrink-0" />
              <span className="text-sm text-foreground">{SERVICE_LABELS[s]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 w-full">
        <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
          Close
        </Button>
        <Button
          type="button"
          onClick={copyRef}
          className={cn(
            "flex-1 gap-1.5 transition-all",
            "bg-sky-800 text-white hover:bg-sky-700 dark:bg-cyan-500 dark:text-gray-950 dark:hover:bg-cyan-400"
          )}
        >
          {copied ? (
            <>
              <Check className="size-4" />
              Copied!
            </>
          ) : (
            "Track request"
          )}
        </Button>
      </div>
    </motion.div>
  );
}
