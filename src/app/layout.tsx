import type { Metadata } from "next";
import { Geist, Geist_Mono, Lato, Dynalight } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ScrollToTop from "@/components/scrollToTop/ScrollToTop";
import { AppProviders } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

const dynalight = Dynalight({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dynalight",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reflex'Bien-être",
  description:
    "Patricia Sermande, réflexologue à La Réunion, propose séances individuelles, ateliers en entreprise et accompagnement bien-être pour sportifs, particuliers et professionnels.",
  metadataBase: new URL("https://reflex-bien-etre.fr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Reflex'Bien-être",
    description:
      "Découvrez les bienfaits de la réflexologie plantaire, des ateliers bien-être en entreprise et des accompagnements personnalisés avec Patricia Sermande.",
    url: "https://reflex-bien-etre.fr",
    siteName: "Reflex'Bien-être",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lato.variable} ${dynalight.variable}`}
      >
        <AppProviders>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </AppProviders>
      </body>
    </html>
  );
}
