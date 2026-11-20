import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Favicon: the white ardbergai mark on a dark rounded tile, legible on light and dark tabs.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const logo = await readFile(join(process.cwd(), "public/logo.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e0f11",
          borderRadius: 14,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered to PNG by ImageResponse */}
        <img src={src} width={48} height={34} alt="" />
      </div>
    ),
    size,
  );
}
