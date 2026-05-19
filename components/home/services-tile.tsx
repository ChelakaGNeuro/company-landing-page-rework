import { ArrowUpRight } from "lucide-react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import Link from "next/link";

export type Tile = {
  title: string;
  description: string;
  image: string;
  slug: string;
};

type ServicesTileProps = {
  tile: Tile;
  categoryId: string;
  categoryLabel: string;
};

export function ServicesTile({
  tile,
  categoryId,
  categoryLabel,
}: ServicesTileProps) {
  const shortLabel = categoryLabel.split(",")[0];

  return (
    <Link
      href={`/${categoryId}/${tile.slug}`}
      className="block group relative overflow-hidden rounded-2xl border border-border bg-background hover:border-border/40 transition-all duration-300"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        

        <Image
          src={tile.image}
          alt={tile.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent" />
        <Badge
          variant="secondary"
          className="absolute top-4 right-4 inline-flex items-center"
        >
          {shortLabel}
        </Badge>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold tracking-tight">{tile.title}</h3>
          <span className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full border border-border text-foreground/70 group-hover:bg-foreground group-hover:text-primary-foreground group-hover:border-foreground transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
        <p className="mt-2 text-foreground/60">{tile.description}</p>
      </div>
    </Link>
  );
}
