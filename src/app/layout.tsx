import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Source_Sans_3 } from "next/font/google";
import "./globals.css";

// Both are variable fonts: one file each covers every weight used.
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Source_Sans_3({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://kristo.vercel.app"),
  title: "Josué Kristo, Senior Product Engineer & Technical Project Manager",
  description:
    "Josué Kristo, product engineer et chef de projet IT basé à Nairobi. Architecture logicielle, pilotage de livraison et intégration de l'IA.",
  alternates: { languages: { fr: "/", en: "/?lang=en" } },
  openGraph: {
    title: "Josué Kristo, Senior Product Engineer",
    description: "Product engineer et chef de projet IT basé à Nairobi.",
    images: ["/portrait.webp"],
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#0F0C0A", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
