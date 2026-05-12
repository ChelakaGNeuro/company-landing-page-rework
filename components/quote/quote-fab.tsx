"use client";

import { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { QuoteFlow } from "./quote-flow";

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

export function QuoteFAB() {
  const [open, setOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [closeRequested, setCloseRequested] = useState(false);

  const isMobile = useMediaQuery("(max-width: 767px)");

  function handleOpen() {
    setCloseRequested(false);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setIsDirty(false);
    setCloseRequested(false);
  }

  function triggerClose() {
    if (isDirty) {
      setCloseRequested(true);
    } else {
      handleClose();
    }
  }

  return (
    <>
      {/* FAB button */}
      <button
        type="button"
        onClick={handleOpen}
        aria-label="Open quote request form"
        aria-haspopup="dialog"
        className={cn(
          "fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full px-5 py-3",
          "text-sm font-semibold text-primary-foreground shadow-lg",
          "bg-primary",
          "transition-all duration-200 hover:scale-105",
        )}
      >
        <FileText className="size-4 shrink-0" />
        <span className="hidden sm:inline">Get Quote</span>
        <span className="sm:hidden">Quote</span>
      </button>

      {/* ── Mobile: bottom-sheet drawer ── */}
      {isMobile && (
        <Drawer
          open={open}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              // Only fires when dismissible=true (not dirty)
              handleClose();
            }
          }}
          dismissible={!isDirty}
          direction="bottom"
        >
          <DrawerContent className="h-[88vh] flex flex-col outline-none">
            <DrawerTitle className="sr-only">Get a Quote</DrawerTitle>
            <QuoteFlow
              onClose={handleClose}
              closeRequested={closeRequested}
              onCloseRequestHandled={() => setCloseRequested(false)}
              onDirtyChange={setIsDirty}
              compact
            />
          </DrawerContent>
        </Drawer>
      )}

      {/* ── Desktop: bubble modal ── */}
      {!isMobile && (
        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black/30 "
                onClick={triggerClose}
                aria-hidden="true"
              />

              {/* Bubble */}
              <motion.div
                key="bubble"
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="fixed bottom-[84px] right-6 z-[55] lg:w-[50vw] md:w-[70vw]"
                role="dialog"
                aria-modal="true"
                aria-label="Quote request form"
              >
                {/* Panel */}
                <div className="max-h-[80vh] flex flex-col rounded-xl border border-border bg-card shadow-2xl shadow-black/15 overflow-hidden">
                  <QuoteFlow
                    onClose={handleClose}
                    closeRequested={closeRequested}
                    onCloseRequestHandled={() => setCloseRequested(false)}
                    onDirtyChange={setIsDirty}
                    compact={false}
                  />
                </div>

                {/* Arrow tail pointing down toward FAB */}
                <div
                  className="absolute -bottom-2.5 right-[72px] size-5 rotate-45 bg-card border-r border-b border-border"
                  aria-hidden="true"
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
