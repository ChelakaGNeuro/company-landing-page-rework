"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { StepServices } from "./step-services";
import { StepDetails } from "./step-details";
import { StepContact } from "./step-contact";
import { StepConfirm } from "./step-confirm";
import type { QuoteFormData, ServiceKey } from "./types";
import { INITIAL_FORM_DATA } from "./types";

const SESSION_KEY = "gnero_quote_flow";

const step3Schema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email({ error: "Please enter a valid email address" }),
  phone: z.string().min(6, "Please enter a valid phone number"),
});

interface Props {
  onClose: () => void;
  closeRequested?: boolean;
  onCloseRequestHandled?: () => void;
  onDirtyChange?: (dirty: boolean) => void;
  compact?: boolean;
}

type Step = 1 | 2 | 3 | 4;

function serializeData(data: QuoteFormData) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { files, ...rest } = data;
  return rest;
}

export function QuoteFlow({
  onClose,
  closeRequested,
  onCloseRequestHandled,
  onDirtyChange,
  compact,
}: Props) {
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<QuoteFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [slideDir, setSlideDir] = useState<1 | -1>(1);

  const isDirty =
    data.services.length > 0 ||
    data.fullName !== "" ||
    data.phone !== "" ||
    data.email !== "";

  // Notify parent of dirty state changes
  useEffect(() => {
    onDirtyChange?.(isDirty && step !== 4);
  }, [isDirty, step, onDirtyChange]);

  // Respond to external close request (e.g. backdrop click)
  useEffect(() => {
    if (!closeRequested) return;
    onCloseRequestHandled?.();
    if (isDirty && step !== 4) {
      setShowConfirm(true);
    } else {
      onClose();
    }
  }, [closeRequested]); // eslint-disable-line react-hooks/exhaustive-deps

  // Check for saved session on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.step && parsed.data?.services?.length > 0) {
          setShowResume(true);
        }
      }
    } catch {}
  }, []);

  // Persist to sessionStorage on data/step change (skip after completion)
  useEffect(() => {
    if (step === 4) return;
    try {
      sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ step, data: serializeData(data) }),
      );
    } catch {}
  }, [step, data]);

  function handleResume() {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setData({ ...INITIAL_FORM_DATA, ...parsed.data, files: [] });
        setStep(parsed.step ?? 1);
      }
    } catch {}
    setShowResume(false);
  }

  function handleStartFresh() {
    sessionStorage.removeItem(SESSION_KEY);
    setShowResume(false);
  }

  function updateData<K extends keyof QuoteFormData>(
    key: K,
    value: QuoteFormData[K],
  ) {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  }

  function handleXClose() {
    if (isDirty && step !== 4) {
      setShowConfirm(true);
    } else {
      onClose();
    }
  }

  function handleDiscard() {
    sessionStorage.removeItem(SESSION_KEY);
    setShowConfirm(false);
    onClose();
  }

  async function goNext() {
    if (step === 1) {
      if (data.services.length === 0) {
        setErrors({ services: "Please select at least one service." });
        return;
      }
      setSlideDir(1);
      setStep(2);
    } else if (step === 2) {
      setSlideDir(1);
      setStep(3);
    } else if (step === 3) {
      const result = step3Schema.safeParse({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
      });
      if (!result.success) {
        const errs: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          errs[issue.path[0] as string] = issue.message;
        });
        setErrors(errs);
        return;
      }
      await submit();
    }
  }

  function goBack() {
    if (step > 1) {
      setErrors({});
      setSlideDir(-1);
      setStep((prev) => (prev - 1) as Step);
    }
  }

  async function submit() {
    setIsSubmitting(true);
    try {
      // TODO: replace with real API call
      await new Promise((res) => setTimeout(res, 1200));
      const year = new Date().getFullYear();
      const code = Math.random().toString(36).substring(2, 6).toUpperCase();
      setReferenceId(`#QR-${year}-${code}`);
      sessionStorage.removeItem(SESSION_KEY);
      setSlideDir(1);
      setStep(4);
    } finally {
      setIsSubmitting(false);
    }
  }

  const slideVariants = {
    enter: (dir: number) => ({ x: dir * 48, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -48, opacity: 0 }),
  };

  return (
    <div className="relative flex flex-col h-full min-h-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
        <div>
          <h1 className="text-base font-semibold text-foreground">
            Get a Quote
          </h1>
          {step < 4 && (
            <p
              className="text-xs text-muted-foreground mt-0.5"
              aria-live="polite"
            >
              Step {step} of 3
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={handleXClose}
          className="rounded-lg p-1.5 hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          aria-label="Close quote form"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Progress bar (steps 1–3 only) */}
      {step < 4 && (
        <div
          className="flex gap-1.5 px-5 pt-3 pb-1 shrink-0"
          role="progressbar"
          aria-valuenow={step}
          aria-valuemin={1}
          aria-valuemax={3}
        >
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "h-1 flex-1 rounded-full transition-all duration-400",
                s <= step ? "bg-primary" : "bg-muted",
              )}
            />
          ))}
        </div>
      )}

      {/* Resume banner */}
      <AnimatePresence>
        {showResume && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-5 mt-3 shrink-0 rounded-xl border border-border bg-card px-4 py-3"
          >
            <p className="text-sm font-medium text-foreground">
              Continue where you left off?
            </p>
            <div className="flex gap-2 mt-2">
              <Button
                type="button"
                size="sm"
                onClick={handleResume}
                className="h-7 px-3 text-xs bg-primary text-primary-foreground hover:bg-primary/80"
              >
                Resume
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={handleStartFresh}
                className="h-7 px-3 text-xs"
              >
                Start over
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step content (scrollable) */}
      <div className="flex-1 overflow-y-auto overscroll-contain min-h-0">
        <AnimatePresence mode="wait" custom={slideDir}>
          <motion.div
            key={step}
            custom={slideDir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="px-5 py-4"
          >
            {step === 1 && (
              <StepServices
                data={data}
                onChange={(services: ServiceKey[]) =>
                  updateData("services", services)
                }
                error={errors.services}
                compact={compact}
              />
            )}
            {step === 2 && <StepDetails data={data} onUpdate={updateData} />}
            {step === 3 && (
              <StepContact data={data} onUpdate={updateData} errors={errors} />
            )}
            {step === 4 && (
              <StepConfirm
                data={data}
                referenceId={referenceId}
                onClose={() => {
                  onClose();
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer nav (steps 1–3 only) */}
      {step < 4 && (
        <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-t border-border bg-background/90 backdrop-blur-sm shrink-0">
          {step > 1 ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={goBack}
              className="gap-1.5"
              aria-label="Go to previous step"
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>
          ) : (
            <div />
          )}
          <Button
            type="button"
            size="sm"
            onClick={goNext}
            disabled={
              (step === 1 && data.services.length === 0) || isSubmitting
            }
            aria-label={step === 3 ? "Submit quote request" : "Go to next step"}
            className={cn(
              "gap-1.5 min-w-24",
              "bg-primary text-primary-foreground hover:bg-primary/80 disabled:opacity-50",
            )}
          >
            {isSubmitting ? (
              <>
                <span className="size-3.5 animate-spin rounded-full border-2 border-current/30 border-t-current" />
                Submitting…
              </>
            ) : step === 3 ? (
              "Submit"
            ) : (
              <>
                Next
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>
        </div>
      )}

      {/* Discard confirmation overlay */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm p-5"
            role="dialog"
            aria-modal="true"
            aria-labelledby="discard-title"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-xs rounded-xl border border-border bg-card p-5 shadow-xl flex flex-col gap-3"
            >
              <h3
                id="discard-title"
                className="text-base font-semibold text-foreground"
              >
                Discard your quote request?
              </h3>
              <p className="text-sm text-muted-foreground">
                Your progress will be lost if you close now.
              </p>
              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowConfirm(false)}
                  autoFocus
                >
                  Keep editing
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={handleDiscard}
                >
                  Discard
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
