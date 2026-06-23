import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MineFuture | Minecraft Lifesteal Server",
  description: "Forge Your Future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
