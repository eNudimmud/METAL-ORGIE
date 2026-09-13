import Image from "next/image";
import { withBasePath } from "@/lib/base-path";
import { MobileMenu } from "./mobile-menu";

const processSteps = [
  {
    number: "01",
    title: "Métal brut",
    src: "/images/vader-raw.jpg",
    alt: "Création métallique inspirée de Dark Vador à l'état brut dans l'atelier",
    position: "center 42%",
  },
  {
    number: "02",
    title: "Apprêt",
    src: "/images/vader-primer.jpg",
    alt: "Création métallique suspendue après application de l'apprêt gris",
    position: "center 37%",
  },
  {
    number: "03",
    title: "Finition",
    src: "/images/vader-paint.jpg",
    alt: "Mise en peinture noire de la création métallique dans l'atelier",
    position: "center 47%",
  },
];

export default function Home() {
  return (
    <main id="top">
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Métal'Orgie, accueil">
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
          <a href={withBasePath("/realisations/")}>Réalisations</a>
          <a href="#atelier">L&apos;atelier</a>
          <a href="#guillaume">Guillaume</a>
        </nav>

        <a className="header-cta" href="#contact">
          Parler de votre projet <span aria-hidden="true">↗</span>
        </a>

        <MobileMenu />
      </header>

      <div id="contenu">
        <section className="hero" aria-labelledby="hero-title">
          <Image
            className="hero-image"
            src={withBasePath("/images/hero-structure.jpg")}
            alt="Ossature métallique sur mesure en cours d'assemblage"
            fill
            priority
            quality={88}
            sizes="100vw"
          />
          <div className="hero-shade" />
          <div className="beam-lines" aria-hidden="true">
            <span className="beam beam-a" />
            <span className="beam beam-b" />
            <span className="beam beam-c" />
          </div>

          <div className="hero-content page-grid">
            <p className="eyebrow hero-eyebrow">Construction métallique · Suisse</p>
            <h1 id="hero-title">
              Toutes les formes
              <span>du métal.</span>
            </h1>
            <p className="hero-intro">
              Acier. Inox. Aluminium.
              <br />
              Construction métallique &amp; créations sur mesure.
            </p>
            <a className="cta cta-primary" href="#contact">
              Parler de votre projet <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="hero-materials" aria-label="Matières travaillées">
            <span>Acier</span>
            <span>Inox</span>
            <span>Aluminium</span>
          </div>

          <a className="scroll-cue" href="#matiere">
            <span>Découvrir</span>
            <i aria-hidden="true" />
          </a>
        </section>

        <section className="materials section-light" id="matiere" aria-labelledby="materials-title">
          <div className="page-grid">
            <div className="section-index reveal">
              <span>01/</span>
              <span>La matière</span>
            </div>

            <div className="materials-heading reveal">
              <p className="eyebrow">Trois matières. Aucun format imposé.</p>
              <h2 id="materials-title">La matière ne dicte pas la forme.</h2>
            </div>

            <div className="material-list">
              <div className="material-row reveal">
                <span className="material-number">01</span>
                <h3>Acier</h3>
                <p>Structure, portée, présence.</p>
              </div>
              <div className="material-row reveal">
                <span className="material-number">02</span>
                <h3>Inox</h3>
                <p>Précision, netteté, finition.</p>
              </div>
              <div className="material-row reveal">
                <span className="material-number">03</span>
                <h3>Aluminium</h3>
                <p>Légèreté, résistance, liberté.</p>
              </div>
            </div>

            <figure className="materials-detail image-reveal">
              <Image
                src={withBasePath("/images/detail-inox.jpg")}
                alt="Finition brossée et raccord précis sur des tubes métalliques"
                fill
                quality={84}
                sizes="(max-width: 760px) 92vw, 34vw"
              />
              <figcaption>
                <span>Le détail</span>
                <span>comme signature</span>
              </figcaption>
            </figure>

            <p className="materials-copy reveal">
              Du profilé qui porte à la tôle qui devient objet, Métal&apos;Orgie travaille le
              métal à toutes les échelles.
            </p>
          </div>
        </section>

        <section className="selected-work section-dark" id="realisations" aria-labelledby="work-title">
          <div className="page-grid">
            <div className="section-index section-index-light reveal">
              <span>02/</span>
              <span>Réalisations sélectionnées</span>
            </div>

            <div className="work-heading reveal">
              <p className="eyebrow eyebrow-light">Une échelle. Puis une autre.</p>
              <h2 id="work-title">Du bâti à la pièce unique.</h2>
            </div>

            <article className="project project-terrace reveal">
              <figure className="project-image image-reveal">
                <Image
                  src={withBasePath("/images/terrace.jpg")}
                  alt="Terrasse surélevée avec garde-corps et mains courantes métalliques"
                  fill
                  quality={86}
                  sizes="(max-width: 760px) 100vw, 68vw"
                />
              </figure>
              <div className="project-caption">
                <span>01 — Architecture &amp; Structure</span>
                <h3>Terrasse surélevée</h3>
              </div>
            </article>

            <article className="project project-kitchen reveal">
              <figure className="project-image image-reveal">
                <Image
                  src={withBasePath("/images/kitchen-inox.jpg")}
                  alt="Habillage métallique sur mesure dans une cuisine aux éléments rouges"
                  fill
                  quality={84}
                  sizes="(max-width: 760px) 100vw, 42vw"
                />
              </figure>
              <div className="project-caption">
                <span>02 — Intérieur &amp; Mobilier</span>
                <h3>Habillage de cuisine</h3>
              </div>
            </article>

            <article className="project project-brasero reveal">
              <figure className="project-image image-reveal">
                <Image
                  src={withBasePath("/images/portfolio/creation-brasero.webp")}
                  alt="Brasero circulaire en métal fabriqué sur mesure"
                  fill
                  quality={84}
                  sizes="(max-width: 760px) 100vw, 30vw"
                />
              </figure>
              <div className="project-caption">
                <span>03 — Créations</span>
                <h3>Brasero sur mesure</h3>
              </div>
            </article>

            <article className="project project-shelf reveal">
              <figure className="project-image image-reveal">
                <Image
                  src={withBasePath("/images/shelving.jpg")}
                  alt="Bibliothèque sur mesure avec structure noire et plateaux en bois"
                  fill
                  quality={84}
                  sizes="(max-width: 760px) 100vw, 48vw"
                />
              </figure>
              <div className="project-caption">
                <span>04 — Intérieur &amp; Mobilier</span>
                <h3>Structure &amp; bois</h3>
              </div>
            </article>

            <a className="text-link work-link" href={withBasePath("/realisations/")}>
              Voir toutes les réalisations <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className="architecture section-light" id="architecture" aria-labelledby="architecture-title">
          <div className="architecture-title-wrap page-grid reveal">
            <div className="section-index">
              <span>03/</span>
              <span>Architecture &amp; Structure</span>
            </div>
            <h2 id="architecture-title">
              Porter.
              <br />
              Relier.
              <br />
              <span>Structurer.</span>
            </h2>
          </div>

          <div className="architecture-stage">
            <figure className="architecture-image image-reveal">
              <Image
                src={withBasePath("/images/exterior-staircase.jpg")}
                alt="Escalier extérieur et palier en construction métallique"
                fill
                quality={86}
                sizes="100vw"
              />
            </figure>
            <div className="architecture-note reveal">
              <span>Architecture &amp; Structure</span>
              <p>
                Ossatures, escaliers, terrasses et garde-corps : le métal devient une
                partie lisible du bâti.
              </p>
            </div>
          </div>
        </section>

        <section className="interior section-steel" id="interieur" aria-labelledby="interior-title">
          <div className="page-grid">
            <div className="section-index reveal">
              <span>04/</span>
              <span>Intérieur &amp; Mobilier</span>
            </div>

            <div className="interior-copy reveal">
              <p className="eyebrow">À l&apos;intérieur</p>
              <h2 id="interior-title">Le métal entre dans l&apos;espace sans l&apos;alourdir.</h2>
              <p>
                Une ligne, un plan, un assemblage : l&apos;ouvrage trouve sa place sans perdre
                sa présence.
              </p>
            </div>

            <figure className="interior-main image-reveal">
              <Image
                src={withBasePath("/images/kitchen-inox.jpg")}
                alt="Plan de travail et habillage métallique dans une cuisine"
                fill
                quality={86}
                sizes="(max-width: 760px) 100vw, 58vw"
              />
            </figure>

            <figure className="interior-secondary image-reveal">
              <Image
                src={withBasePath("/images/shelving.jpg")}
                alt="Bibliothèque métal et bois dessinée sur mesure"
                fill
                quality={84}
                sizes="(max-width: 760px) 82vw, 31vw"
              />
              <figcaption>Mobilier · structure sur mesure</figcaption>
            </figure>
          </div>
        </section>

        <section className="creation section-dark" id="creations" aria-labelledby="creation-title">
          <div className="page-grid">
            <div className="section-index section-index-light reveal">
              <span>05/</span>
              <span>Créations sur mesure</span>
            </div>

            <div className="creation-heading reveal">
              <p className="eyebrow eyebrow-light">Étude de cas</p>
              <h2 id="creation-title">Une idée inhabituelle. Quatre états de matière.</h2>
              <p>
                Une création inspirée de Dark Vador, depuis le métal brut jusqu&apos;à la
                finition noire. Ici, le processus fait partie de l&apos;objet.
              </p>
            </div>

            <figure className="creation-final image-reveal">
              <Image
                src={withBasePath("/images/vader-final.jpg")}
                alt="Création métallique terminée inspirée du casque de Dark Vador"
                fill
                quality={88}
                sizes="(max-width: 760px) 100vw, 50vw"
              />
              <figcaption>
                <span>04</span>
                <span>Pièce achevée</span>
              </figcaption>
            </figure>

            <div className="process-strip" aria-label="Étapes de fabrication">
              {processSteps.map((step) => (
                <figure className="process-step reveal" key={step.number}>
                  <div className="process-image image-reveal">
                    <Image
                      src={withBasePath(step.src)}
                      alt={step.alt}
                      fill
                      quality={80}
                      sizes="(max-width: 760px) 32vw, 16vw"
                      style={{ objectPosition: step.position }}
                    />
                  </div>
                  <figcaption>
                    <span>{step.number}</span>
                    <span>{step.title}</span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <blockquote className="creation-quote reveal">
              <span>“</span>
              Transformer une idée inhabituelle en objet réel.
            </blockquote>
          </div>
        </section>

        <section className="atelier section-black" id="atelier" aria-labelledby="atelier-title">
          <div className="page-grid">
            <div className="section-index section-index-light reveal">
              <span>06/</span>
              <span>Atelier &amp; Savoir-faire</span>
            </div>

            <h2 id="atelier-title" className="atelier-title reveal">
              Le détail
              <span>n&apos;est pas</span>
              un détail.
            </h2>

            <figure className="atelier-weld image-reveal">
              <Image
                src={withBasePath("/images/detail-weld.jpg")}
                alt="Gros plan sur des cordons de soudure réguliers"
                fill
                quality={88}
                sizes="(max-width: 760px) 100vw, 54vw"
              />
              <figcaption>Cordons · assemblage · contrôle</figcaption>
            </figure>

            <figure className="atelier-finish image-reveal">
              <Image
                src={withBasePath("/images/detail-inox.jpg")}
                alt="Gros plan d'une finition métallique brossée dans un angle"
                fill
                quality={86}
                sizes="(max-width: 760px) 82vw, 31vw"
              />
              <figcaption>Finition · raccord · précision</figcaption>
            </figure>

            <p className="atelier-copy reveal">
              La précision se voit dans un raccord, un angle, un cordon. Avant même de
              regarder l&apos;ensemble.
            </p>
          </div>
        </section>

        <section className="guillaume section-light" id="guillaume" aria-labelledby="guillaume-title">
          <div className="page-grid">
            <div className="section-index reveal">
              <span>07/</span>
              <span>Guillaume / Métal&apos;Orgie</span>
            </div>

            <div className="guillaume-monogram reveal" aria-hidden="true">
              G<span>R</span>
            </div>

            <div className="guillaume-copy reveal">
              <p className="eyebrow">Derrière l&apos;atelier</p>
              <h2 id="guillaume-title">Guillaume Rossier.</h2>
              <p>
                Métal&apos;Orgie réunit les ouvrages qui structurent, les éléments qui
                équipent et les objets qui n&apos;existaient encore que dans un croquis.
              </p>
              <a className="text-link text-link-dark" href="#contact">
                Présenter une idée <span aria-hidden="true">↗</span>
              </a>
            </div>

            <figure className="guillaume-image image-reveal">
              <Image
                src={withBasePath("/images/sailboat.jpg")}
                alt="Grande création en forme de voilier manutentionnée devant l'atelier"
                fill
                quality={84}
                sizes="(max-width: 760px) 100vw, 38vw"
              />
            </figure>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="page-grid">
            <div className="section-index reveal">
              <span>08/</span>
              <span>Votre projet</span>
            </div>

            <div className="contact-heading reveal">
              <p className="eyebrow">Même au stade du croquis</p>
              <h2 id="contact-title">Parlez-nous de votre projet.</h2>
              <p>
                Un ouvrage architectural, un agencement ou une création singulière ?
                Envoyez quelques lignes, une photo ou un croquis.
              </p>
            </div>

            <form className="contact-form" action="#contact">
              <label>
                <span>Votre nom</span>
                <input type="text" name="name" autoComplete="name" required />
              </label>
              <label>
                <span>Téléphone ou e-mail</span>
                <input type="text" name="contact" autoComplete="email" required />
              </label>
              <label className="field-wide">
                <span>Décrivez votre projet</span>
                <textarea name="project" rows={4} required />
              </label>
              <label className="file-field field-wide">
                <span>Ajouter une photo ou un croquis</span>
                <input type="file" name="attachment" accept="image/*,.pdf" />
                <i aria-hidden="true">＋</i>
              </label>
              <button className="submit-button field-wide" type="submit">
                Envoyer ma demande <span aria-hidden="true">↗</span>
              </button>
            </form>
          </div>
        </section>
      </div>

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

      <a className="mobile-contact" href="#contact">
        Parler de votre projet <span aria-hidden="true">↗</span>
      </a>
    </main>
  );
}
