import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Egg Production Log",
    short_name: "EggLog",
    description: "Track your egg production and get insights",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#38bdf8",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}

