import type { Palette } from "@/lib/palettes";
import { Container } from "@/components/version2/site/Container";

export function PalettePreview({ palette }: { palette: Palette }) {
  return (
    <aside aria-label={`${palette.name} colour palette`} className="border-b border-line bg-panel/70">
      <Container className="grid gap-5 py-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-center">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-gold">Colour study</p>
          <p className="mt-1 font-heading text-xl font-bold text-mist">{palette.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{palette.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {palette.swatches.map((swatch) => (
            <div key={swatch.name} className="min-w-0">
              <div className="h-9 rounded-md border border-line" style={{ backgroundColor: swatch.hex }} />
              <p className="mt-1 truncate text-xs font-semibold text-mist">{swatch.name}</p>
              <p className="font-mono text-[10px] text-muted-foreground">{swatch.hex}</p>
            </div>
          ))}
        </div>
      </Container>
    </aside>
  );
}
