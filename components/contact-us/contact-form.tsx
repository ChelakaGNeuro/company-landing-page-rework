"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { easeOut, motion } from "framer-motion";
import { SendIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SERVICES, VALIDATION, PLACEHOLDERS } from "./config";

const transition = { duration: 0.8, ease: easeOut };

function stagger(i: number) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    transition: { ...transition, delay: i * 0.08 },
    viewport: { once: true, amount: 0.2 },
  };
}

const schema = z.object({
  name: z.string().min(VALIDATION.name.min, VALIDATION.name.message),
  email: z.string().email({ error: VALIDATION.email.message }),
  service: z.string().min(1, VALIDATION.service.message),
  message: z.string().min(VALIDATION.message.min, VALIDATION.message.message),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit() {
    // TODO: replace with real API call
    await new Promise((res) => setTimeout(res, 1200));
    setSuccess(true);
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={transition}
        className="flex flex-col gap-4 p-10 border rounded-xl bg-muted/30 text-center items-center justify-center min-h-80"
      >
        <Button size={"icon-lg"} className=" bg-foreground/10 dark:bg-foreground/10 ">
          <SendIcon className="text-primary dark:text-primary" />
        </Button>
        <h3 className="text-2xl font-display font-semibold">Message sent!</h3>
        <p className="text-muted-foreground">
          Thanks for reaching out. We&apos;ll be in touch soon.
        </p>
        <Button
          variant="outline"
          className="mt-2"
          onClick={() => {
            setSuccess(false);
            reset();
          }}
        >
          Send another
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div {...stagger(0)} className="flex flex-col gap-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            placeholder={PLACEHOLDERS.name}
            aria-invalid={!!errors.name}
            className="h-11 text-base"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </motion.div>

        <motion.div {...stagger(1)} className="flex flex-col gap-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder={PLACEHOLDERS.email}
            aria-invalid={!!errors.email}
            className="h-11 text-base"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </motion.div>
      </div>

      <motion.div {...stagger(2)} className="flex flex-col gap-2">
        <Label>Service of interest</Label>
        <Controller
          name="service"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                className="h-11 w-full text-base"
                aria-invalid={!!errors.service}
              >
                <SelectValue placeholder={PLACEHOLDERS.service} />
              </SelectTrigger>
              <SelectContent>
                {SERVICES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.service && (
          <p className="text-sm text-destructive">{errors.service.message}</p>
        )}
      </motion.div>

      <motion.div {...stagger(3)} className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder={PLACEHOLDERS.message}
          aria-invalid={!!errors.message}
          className="min-h-36 text-base resize-none"
          {...register("message")}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </motion.div>

      <motion.div {...stagger(4)}>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="gap-2 px-8 h-12"
          size="lg"
        >
          {isSubmitting ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Sending…
            </>
          ) : (
            <>
              <SendIcon className="size-4" />
              Send message
            </>
          )}
        </Button>
      </motion.div>
    </form>
  );
}
