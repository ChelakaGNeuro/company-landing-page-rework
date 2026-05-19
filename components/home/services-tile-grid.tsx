import { ServicesTile } from "./services-tile";
import type { Tile } from "./services-tile";

type ServicesTileGridProps = {
  tiles: readonly Tile[];
  categoryId: string;
  categoryLabel: string;
};

export default function ServicesTileGrid({
  tiles,
  categoryId,
  categoryLabel,
}: ServicesTileGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tiles.map((tile) => (
        <ServicesTile
          key={tile.slug}
          tile={tile}
          categoryId={categoryId}
          categoryLabel={categoryLabel}
        />
      ))}
    </div>
  );
}
