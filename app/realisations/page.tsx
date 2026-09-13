import type { Metadata } from "next";
import Image from "next/image";
import { withBasePath } from "@/lib/base-path";
import { MobileMenu } from "../mobile-menu";
import { ProjectGallery } from "./gallery";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Découvrez les réalisations de Métal'Orgie : architecture et structure, intérieur et mobilier, créations, atelier et savoir-faire.",
};

export default function RealisationsPage() {
  return (
    <main id="top" className="portfolio-page">
      <a className="skip-link" href="#galerie">
        Aller aux réalisations
      </a>

      <header className="site-header">
        <a className="brand" href={withBasePath("/")} aria-label="Métal'Orgie, accueil">
          <span className="brand-mark">
            <Image
              src={withBasePath("/images/logo-metalorgie.jpg")}
              alt=""
              width={56}
              height={56}
              sizes="56px"
            />
          </span>
          <span className="brand-word">
            MÉTAL&apos;ORGIE
            <small>GUILLAUME ROSSIER</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Navigation principale">
          <a href={withBasePath("/realisations/")} aria-current="page">
            Réalisations
          </a>
          <a href={withBasePath("/#atelier")}>L&apos;atelier</a>
          <a href={withBasePath("/#guillaume")}>Guillaume</a>
        </nav>

        <a className="header-cta" href={withBasePath("/#contact")}>
          Parler de votre projet <span aria-hidden="true">↗</span>
        </a>

        <MobileMenu />
      </header>

      <section className="portfolio-intro page-grid" aria-labelledby="portfolio-title">
        <p className="portfolio-kicker">Corpus complet · 29 photographies</p>
        <h1 id="portfolio-title">
          Toutes les
          <span>réalisations.</span>
        </h1>
        <p className="portfolio-lead">
          Ouvrages, agencements, objets et gestes d&apos;atelier. Quatre familles, une même
          exigence dans la fabrication.
        </p>
        <a className="portfolio-back" href={withBasePath("/")}>
          ← Retour à l&apos;accueil
        </a>
      </section>

      <section className="portfolio-gallery" id="galerie" aria-label="Galerie des réalisations">
        <ProjectGallery />
      </section>

      <section className="portfolio-contact" aria-labelledby="portfolio-contact-title">
        <p>Une forme à construire ?</p>
        <h2 id="portfolio-contact-title">Parlez-nous de votre projet.</h2>
        <a className="cta cta-primary" href={withBasePath("/#contact")}>
          Présenter votre idée <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer className="site-footer">
        <div className="footer-brand">
          <span>MÉTAL&apos;ORGIE</span>
          <span>Acier · Inox · Aluminium</span>
        </div>
        <p>Construction métallique &amp; créations sur mesure · Suisse</p>
        <div className="footer-meta">
          <span>Guillaume Rossier</span>
          <span>Mentions légales</span>
          <a href="#top">Retour en haut ↑</a>
        </div>
      </footer>

      <a className="mobile-contact" href={withBasePath("/#contact")}>
        Parler de votre projet <span aria-hidden="true">↗</span>
      </a>
    </main>
  );
}
