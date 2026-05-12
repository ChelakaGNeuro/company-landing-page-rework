"use client";

import { useState, useRef } from "react";
import { Upload, X, FileText, Phone, Mail, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { QuoteFormData } from "./types";

const COUNTRY_CODES = [
  { code: "+94", label: "+94 LK" },
  { code: "+91", label: "+91 IN" },
  { code: "+1", label: "+1 US" },
  { code: "+44", label: "+44 GB" },
  { code: "+971", label: "+971 AE" },
  { code: "+966", label: "+966 SA" },
  { code: "+60", label: "+60 MY" },
  { code: "+65", label: "+65 SG" },
  { code: "+61", label: "+61 AU" },
  { code: "+86", label: "+86 CN" },
];

const ACCEPTED_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png", ".dwg"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

function isValidFile(file: File) {
  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  return ACCEPTED_EXTENSIONS.includes(ext) && file.size <= MAX_FILE_SIZE;
}

function formatBytes(bytes: number) {
  return bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(0)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileDropzone({
  files,
  onChange,
}: {
  files: File[];
  onChange: (files: File[]) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const valid = Array.from(e.dataTransfer.files).filter(isValidFile);
    onChange([...files, ...valid]);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const valid = Array.from(e.target.files ?? []).filter(isValidFile);
    onChange([...files, ...valid]);
    e.target.value = "";
  }

  function removeFile(index: number) {
    onChange(files.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        aria-label="Upload files"
        className={cn(
          "flex flex-col items-center gap-2 rounded-xl border-2 border-dashed p-6 cursor-pointer text-center transition-all",
          isDragging
            ? "border-primary bg-background "
            : "border-border hover:border-primary/40",
        )}
      >
        <Upload
          className={cn(
            "size-5 transition-colors",
            isDragging
              ? "text-foreground"
              : "text-muted-foreground",
          )}
        />
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Click to upload</span>{" "}
          or drag and drop
        </p>
        <p className="text-xs text-muted-foreground">
          PDF, JPG, PNG, DWG · max 10 MB each
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.dwg"
          className="hidden"
          onChange={handleChange}
          aria-hidden
        />
      </div>

      {files.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2"
            >
              <FileText className="size-4 shrink-0 text-muted-foreground" />
              <span className="flex-1 truncate text-sm text-foreground">
                {file.name}
              </span>
              <span className="text-xs text-muted-foreground shrink-0">
                {formatBytes(file.size)}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(i);
                }}
                className="shrink-0 rounded p-0.5 hover:bg-muted transition-colors"
                aria-label={`Remove ${file.name}`}
              >
                <X className="size-3.5 text-muted-foreground" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface Props {
  data: QuoteFormData;
  onUpdate: <K extends keyof QuoteFormData>(
    key: K,
    value: QuoteFormData[K],
  ) => void;
  errors: Partial<Record<string, string>>;
}

export function StepContact({ data, onUpdate, errors }: Props) {
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  function markTouched(field: string) {
    setTouched((prev) => new Set([...prev, field]));
  }

  function validateOnBlur(field: string, value: string) {
    markTouched(field);
    let msg = "";
    if (field === "fullName" && value.trim().length < 2) {
      msg = "Name must be at least 2 characters";
    } else if (
      field === "email" &&
      value &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      msg = "Please enter a valid email address";
    } else if (field === "phone" && value.trim().length < 6) {
      msg = "Please enter a valid phone number";
    }
    setLocalErrors((prev) => ({ ...prev, [field]: msg }));
  }

  function fieldError(name: string) {
    return touched.has(name)
      ? localErrors[name] || errors[name] || ""
      : errors[name] || "";
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Where should we send your quote?
        </h2>
      </div>

      {/* Full name + Company name */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="fullName">
            Full name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="fullName"
            placeholder="e.g. Nimal Perera"
            value={data.fullName}
            onChange={(e) => onUpdate("fullName", e.target.value)}
            onBlur={(e) => validateOnBlur("fullName", e.target.value)}
            aria-invalid={!!fieldError("fullName")}
            className="h-9 text-sm"
          />
          {fieldError("fullName") && (
            <p className="text-xs text-destructive" role="alert">
              {fieldError("fullName")}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="companyName">Company name</Label>
          <Input
            id="companyName"
            placeholder="Optional"
            value={data.companyName}
            onChange={(e) => onUpdate("companyName", e.target.value)}
            className="h-9 text-sm"
          />
        </div>
      </div>

      {/* Phone with country code */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="phone">
          Phone <span className="text-destructive">*</span>
        </Label>
        <div className="flex gap-2">
          <Select
            value={data.countryCode}
            onValueChange={(v) => onUpdate("countryCode", v)}
          >
            <SelectTrigger aria-label="Country code" className="w-25 shrink-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COUNTRY_CODES.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            id="phone"
            type="tel"
            placeholder="07X XXX XXXX"
            value={data.phone}
            onChange={(e) => onUpdate("phone", e.target.value)}
            onBlur={(e) => validateOnBlur("phone", e.target.value)}
            aria-invalid={!!fieldError("phone")}
            className="h-9 text-sm flex-1"
          />
        </div>
        {fieldError("phone") && (
          <p className="text-xs text-destructive" role="alert">
            {fieldError("phone")}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={data.email}
          onChange={(e) => onUpdate("email", e.target.value)}
          onBlur={(e) => validateOnBlur("email", e.target.value)}
          aria-invalid={!!fieldError("email")}
          className="h-9 text-sm"
        />
        {fieldError("email") && (
          <p className="text-xs text-destructive" role="alert">
            {fieldError("email")}
          </p>
        )}
      </div>

      {/* Preferred contact method */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-foreground">
          Preferred contact method
        </p>
        <div
          className="flex gap-3"
          role="radiogroup"
          aria-label="Preferred contact method"
        >
          {(
            [
              { value: "phone", icon: Phone, label: "Phone" },
              { value: "email", icon: Mail, label: "Email" },
              { value: "whatsapp", icon: MessageCircle, label: "WhatsApp" },
            ] as const
          ).map(({ value, icon: Icon, label }) => (
            <label
              key={value}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 cursor-pointer text-sm font-medium transition-all",
                data.contactMethod === value
                  ? "border-foreground bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary/40 ",
              )}
            >
              <input
                type="radio"
                name="contactMethod"
                value={value}
                checked={data.contactMethod === value}
                onChange={() => onUpdate("contactMethod", value)}
                className="sr-only"
              />
              <Icon className="size-4 shrink-0" />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Best time */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="bestTime">Best time to reach you</Label>
        <Select
          value={data.bestTime}
          onValueChange={(v) =>
            onUpdate("bestTime", v as QuoteFormData["bestTime"])
          }
        >
          <SelectTrigger id="bestTime" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="morning">Morning (8am – 12pm)</SelectItem>
            <SelectItem value="afternoon">Afternoon (12pm – 5pm)</SelectItem>
            <SelectItem value="evening">Evening (5pm – 8pm)</SelectItem>
            <SelectItem value="anytime">Anytime</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* File upload */}
      <div className="flex flex-col gap-1.5">
        <Label>Attachments</Label>
        <p className="text-xs text-muted-foreground -mt-1">
          Attach drawings, photos, or specs (optional).
        </p>
        <FileDropzone
          files={data.files}
          onChange={(files) => onUpdate("files", files)}
        />
      </div>

      {/* Notes */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="notes">Additional notes</Label>
        <Textarea
          id="notes"
          placeholder="Anything else we should know?"
          value={data.notes}
          onChange={(e) => onUpdate("notes", e.target.value)}
          className="min-h-20 text-sm resize-none"
        />
      </div>

      <p className="text-xs text-muted-foreground">
        By submitting, you agree to be contacted about your inquiry.
      </p>
    </div>
  );
}
