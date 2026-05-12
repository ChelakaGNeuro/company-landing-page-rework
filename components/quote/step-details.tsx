"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { QuoteFormData } from "./types";

const TIMELINE_OPTIONS = [
  { value: "within-1m", label: "Within 1 month" },
  { value: "1-3m", label: "1-3 months" },
  { value: "3-6m", label: "3-6 months" },
  { value: "exploring", label: "Just exploring" },
];

function ChipGroup({
  options,
  selected,
  onChange,
  multi = false,
  label,
}: {
  options: string[];
  selected: string | string[];
  onChange: (val: string | string[]) => void;
  multi?: boolean;
  label?: string;
}) {
  function toggle(opt: string) {
    if (multi) {
      const arr = selected as string[];
      onChange(
        arr.includes(opt) ? arr.filter((v) => v !== opt) : [...arr, opt],
      );
    } else {
      onChange((selected as string) === opt ? "" : opt);
    }
  }

  const isSelected = (opt: string) =>
    multi ? (selected as string[]).includes(opt) : (selected as string) === opt;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
      )}
      <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            aria-pressed={isSelected(opt)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium transition-all border",
              isSelected(opt)
                ? "bg-primary text-primary-foreground border-muted"
                : "border-border bg-background text-foreground hover:border-muted-foreground",
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function FieldSelect({
  id,
  label,
  value,
  options,
  onChange,
  placeholder = "Select…",
}: {
  id: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 pt-1">
      <h3 className="text-sm font-semibold text-foreground  whitespace-nowrap">
        {title}
      </h3>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

interface Props {
  data: QuoteFormData;
  onUpdate: <K extends keyof QuoteFormData>(
    key: K,
    value: QuoteFormData[K],
  ) => void;
}

export function StepDetails({ data, onUpdate }: Props) {
  const { services } = data;

  function updateSection<K extends "facade" | "access" | "digital" | "it">(
    section: K,
    field: string,
    value: unknown,
  ) {
    onUpdate(section, {
      ...(data[section] as unknown as Record<string, unknown>),
      [field]: value,
    } as unknown as QuoteFormData[K]);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Tell us about your project
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Help us prepare an accurate quote.
        </p>
      </div>

      {services.includes("facade") && (
        <div className="flex flex-col gap-4">
          <SectionHeader title="Facade Solutions" />
          <ChipGroup
            label="Project type"
            options={["Residential", "Commercial", "Industrial", "Mixed-use"]}
            selected={data.facade.projectType}
            onChange={(v) => updateSection("facade", "projectType", v)}
          />
          <ChipGroup
            label="Products needed"
            options={[
              "Doors",
              "Windows",
              "Curtain Walls",
              "Cladding",
              "Partitions",
              "Ceilings",
              "Shop Fronts",
              "Tempered Glass",
              "Shower Cubicles",
              "Painting",
            ]}
            selected={data.facade.products}
            onChange={(v) => updateSection("facade", "products", v)}
            multi
          />
          <FieldSelect
            id="facade-scale"
            label="Approximate scale"
            value={data.facade.scale}
            options={[
              { value: "small", label: "Small (under 1,000 sqft)" },
              { value: "medium", label: "Medium (1,000-5,000 sqft)" },
              { value: "large", label: "Large (5,000+ sqft)" },
              { value: "unsure", label: "Not sure yet" },
            ]}
            onChange={(v) => updateSection("facade", "scale", v)}
          />
          <FieldSelect
            id="facade-timeline"
            label="Timeline"
            value={data.facade.timeline}
            options={TIMELINE_OPTIONS}
            onChange={(v) => updateSection("facade", "timeline", v)}
          />
        </div>
      )}

      {services.includes("access") && (
        <div className="flex flex-col gap-4">
          <SectionHeader title="Access Solutions" />
          <ChipGroup
            label="Project type"
            options={["Residential", "Commercial", "Industrial"]}
            selected={data.access.projectType}
            onChange={(v) => updateSection("access", "projectType", v)}
          />
          <ChipGroup
            label="Products needed"
            options={[
              "Remote Roller Doors",
              "Manual Roller Doors",
              "Roller Shutters",
              "Sliding Gates",
              "Gutters",
              "Roofing",
              "Railings",
            ]}
            selected={data.access.products}
            onChange={(v) => updateSection("access", "products", v)}
            multi
          />
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="access-quantity">Quantity / scale</Label>
            <Input
              id="access-quantity"
              placeholder="e.g. 3 roller doors, 1 sliding gate"
              value={data.access.quantity}
              onChange={(e) =>
                updateSection("access", "quantity", e.target.value)
              }
              className="h-9 text-sm"
            />
          </div>
          <FieldSelect
            id="access-timeline"
            label="Timeline"
            value={data.access.timeline}
            options={TIMELINE_OPTIONS}
            onChange={(v) => updateSection("access", "timeline", v)}
          />
        </div>
      )}

      {services.includes("digital") && (
        <div className="flex flex-col gap-4">
          <SectionHeader title="Digital Solutions" />
          <ChipGroup
            label="What do you need?"
            options={[
              "Website",
              "E-commerce",
              "ERP System",
              "POS Platform",
              "Custom System",
            ]}
            selected={data.digital.needs}
            onChange={(v) => updateSection("digital", "needs", v)}
            multi
          />
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-foreground">Project stage</p>
            <RadioGroup
              value={data.digital.stage}
              onValueChange={(val) => updateSection("digital", "stage", val)}
              className="flex flex-col gap-2"
              aria-label="Project stage"
            >
              {[
                { value: "scratch", label: "Starting from scratch" },
                { value: "replacing", label: "Replacing existing system" },
                { value: "adding", label: "Adding to existing system" },
              ].map((opt) => (
                <div key={opt.value} className="flex items-center gap-2.5 cursor-pointer">
                  <RadioGroupItem
                    value={opt.value}
                    id={`digital-stage-${opt.value}`}
                    className="size-4"
                  />
                  <Label
                    htmlFor={`digital-stage-${opt.value}`}
                    className="text-sm text-foreground cursor-pointer"
                  >
                    {opt.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <FieldSelect
            id="digital-budget"
            label="Rough budget range"
            value={data.digital.budget}
            options={[
              { value: "under-100k", label: "Under LKR 100,000" },
              { value: "100k-500k", label: "LKR 100,000 - 500,000" },
              { value: "500k-1m", label: "LKR 500,000 - 1,000,000" },
              { value: "1m-5m", label: "LKR 1,000,000 - 5,000,000" },
              { value: "over-5m", label: "Over LKR 5,000,000" },
            ]}
            onChange={(v) => updateSection("digital", "budget", v)}
          />
          <FieldSelect
            id="digital-timeline"
            label="Timeline"
            value={data.digital.timeline}
            options={TIMELINE_OPTIONS}
            onChange={(v) => updateSection("digital", "timeline", v)}
          />
        </div>
      )}

      {services.includes("it") && (
        <div className="flex flex-col gap-4">
          <SectionHeader title="IT Infrastructure" />
          <ChipGroup
            label="Nature of need"
            options={[
              "New setup",
              "Upgrade",
              "Security audit",
              "Hardware only",
              "Ongoing support",
            ]}
            selected={data.it.needs}
            onChange={(v) => updateSection("it", "needs", v)}
            multi
          />
          <ChipGroup
            label="Areas"
            options={[
              "Networking",
              "Cybersecurity",
              "Servers/NAS",
              "Routers/Switches/Firewalls",
              "Hardware POS",
            ]}
            selected={data.it.areas}
            onChange={(v) => updateSection("it", "areas", v)}
            multi
          />
          <FieldSelect
            id="it-size"
            label="Organisation size"
            value={data.it.size}
            options={[
              { value: "1-10", label: "1-10 users" },
              { value: "11-50", label: "11-50 users" },
              { value: "51-200", label: "51-200 users" },
              { value: "enterprise", label: "200+ users / enterprise" },
            ]}
            onChange={(v) => updateSection("it", "size", v)}
          />
          <FieldSelect
            id="it-timeline"
            label="Timeline"
            value={data.it.timeline}
            options={TIMELINE_OPTIONS}
            onChange={(v) => updateSection("it", "timeline", v)}
          />
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="location">Project location</Label>
        <Input
          id="location"
          placeholder="City or area (e.g. Colombo)"
          value={data.location}
          onChange={(e) => onUpdate("location", e.target.value)}
          className="h-9 text-sm"
        />
      </div>
    </div>
  );
}
