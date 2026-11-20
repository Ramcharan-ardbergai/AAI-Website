import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Home-screen icon (iOS): same mark, larger tile; iOS rounds the corners itself.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
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
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered to PNG by ImageResponse */}
        <img src={src} width={120} height={84} alt="" />
      </div>
    ),
    size,
  );
}
