import type { Metadata } from "next";
import { Inter, Oswald, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/components/auth/AuthProvider";
import AllayCompanion from "@/components/AllayCompanion";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "MineFuture | Minecraft Lifesteal Server",
  description: "Forge Your Future. Join the Ultimate Minecraft Lifesteal Experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bg-gradient min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <AllayCompanion />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
