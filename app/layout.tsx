import type { Metadata } from "next";
import { withBasePath } from "@/lib/base-path";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Métal'Orgie — Construction métallique & créations sur mesure",
    template: "%s — Métal'Orgie",
  },
  description:
    "Métal'Orgie, atelier de Guillaume Rossier en Suisse : acier, inox, aluminium, construction métallique et créations sur mesure.",
  openGraph: {
    title: "Métal'Orgie — Toutes les formes du métal",
    description:
      "Acier, inox, aluminium. Construction métallique et créations sur mesure en Suisse.",
    locale: "fr_CH",
    type: "website",
  },
  icons: {
    icon: withBasePath("/favicon.svg"),
    shortcut: withBasePath("/favicon.svg"),
  },
};

const fontStyles = `
  @font-face {
    font-family: "Geist";
    src: url("${withBasePath("/fonts/geist-latin-ext.woff2")}") format("woff2");
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Geist Mono";
    src: url("${withBasePath("/fonts/geist-mono-latin-ext.woff2")}") format("woff2");
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
  }
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
