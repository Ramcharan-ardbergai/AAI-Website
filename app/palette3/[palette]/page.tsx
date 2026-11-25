import { notFound } from "next/navigation";
import { HomeSections } from "@/components/site/HomeSections";
import { getPalette, palette1 } from "@/lib/palettes";

export function generateStaticParams() {
  return palette1.filter(({ slug }) => slug !== "graphite").map(({ slug }) => ({ palette: slug }));
}

export default async function Palette3ThemePage({ params }: PageProps<"/palette3/[palette]">) {
  const { palette: slug } = await params;
  const palette = getPalette(slug);

  if (!palette || palette.slug === "graphite") notFound();

  return <HomeSections orbit />;
}
