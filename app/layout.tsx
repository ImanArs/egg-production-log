"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { BottomNavigation } from "@/components/bottom-navigation";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    // Hide navigation on onboarding screens
    if (pathname.includes("/onboarding")) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [pathname]);

  return (
    <html lang="ru">
      <head>
        <title>Egg Production Log</title>
        <meta
          name="description"
          content="Track your egg production and get insights"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-gray-50 text-gray-900 flex flex-col h-screen">
        <main className="flex-1 pb-16">{children}</main>
        {showNav && <BottomNavigation />}
      </body>
    </html>
  );
}
