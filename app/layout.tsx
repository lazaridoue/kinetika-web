import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kinétika — Transformando tu potencial en movimiento",
  // Verbatim from the archived "Sobre Nosotros" section.
  description:
    "Somos una firma consultora que se especializa en la transformación de personas, futuros líderes y empresas startup para desencadenar y poner en movimiento su potencial a través de un método cristocéntrico de trabajo con especialistas expertos en diferentes disciplinas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        {/* Verbatim: the archived site's own skip-link text. */}
        <a href="#main" className="skip-link">
          Ir al contenido
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
