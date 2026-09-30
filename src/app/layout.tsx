import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-display", display: "swap" });
const body = Source_Sans_3({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
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
    <html lang="fr" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
