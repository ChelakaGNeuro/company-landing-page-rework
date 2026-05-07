import { Button } from "../ui/button";
import type { Tile } from "./services-tile";

export type Category = {
  id: string;
  label: string;
  tiles: readonly Tile[];
};

type ServicesTabBarProps = {
  categories: readonly Category[];
  activeId: string;
  onSelect: (id: string) => void;
};

export function ServicesTabBar({
  categories,
  activeId,
  onSelect,
}: ServicesTabBarProps) {
  return (
    <div className="flex justify-center w-full">
      <div className="inline-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-12 w-full">
        {categories.map((c) => {
          const isActive = c.id === activeId;
          return (
            <Button
              key={c.id}
              onClick={() => onSelect(c.id)}
              size={"lg"}
              className={`px-5 py-2.5 border w-auto  transition-all duration-200 text-wrap ${
                isActive
                  ? "bg-foreground border-foreground text-primary-foreground"
                  : "bg-accent border-border text-foreground/70 hover:border-border/30 hover:text-foreground"
              }`}
            >
              {c.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
