"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux"; // Import du Provider Redux
import { store } from "../store"; // Import du store Redux
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ScrollToTop from "@/components/scrollToTop/ScrollToTop";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={store}>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </Provider>
      </body>
    </html>
  );
}
