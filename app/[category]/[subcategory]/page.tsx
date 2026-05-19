import { notFound } from "next/navigation";
import { SERVICE_CATEGORIES } from "@/components/constants/service-categories";

export function generateStaticParams() {
  return SERVICE_CATEGORIES.flatMap((c) =>
    c.tiles.map((t) => ({ category: c.id, subcategory: t.slug }))
  );
}

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) {
  const { category, subcategory } = await params;

  const cat = SERVICE_CATEGORIES.find((c) => c.id === category);
  const tile = cat?.tiles.find((t) => t.slug === subcategory);
  if (!cat || !tile) notFound();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tight">
        {tile.title}
      </h1>
      <p className="mt-4 text-foreground/60 text-lg">Content coming soon</p>
    </main>
  );
}
