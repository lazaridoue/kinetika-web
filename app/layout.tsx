import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

/* The two families named in globals.css. Nothing else gets loaded.
   Locale routing arrives in issue #5 — until then the site is Spanish only,
   which matches the default we're committed to anyway. */

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
      <body>
        {/* Issue #4. Styled in globals.css, hidden until keyboard focus. */}
        <a href="#main" className="skip-link">
          Ir al contenido
        </a>
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
