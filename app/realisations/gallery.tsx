"use client";

import Image from "next/image";
import { withBasePath } from "@/lib/base-path";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Category = "architecture" | "interieur" | "creations" | "atelier";

type Project = {
  id: string;
  title: string;
  category: Category;
  src: string;
  alt: string;
  ratio: string;
  position?: string;
};

const categoryLabels: Record<Category, string> = {
  architecture: "Architecture & Structure",
  interieur: "Intérieur & Mobilier",
  creations: "Créations",
  atelier: "Atelier & Savoir-faire",
};

const projects: Project[] = [
  {
    id: "terrasse-surelevee",
    title: "Terrasse surélevée",
    category: "architecture",
    src: "/images/portfolio/architecture-terrasse.webp",
    alt: "Terrasse surélevée avec garde-corps métalliques",
    ratio: "16 / 9",
    position: "center 43%",
  },
  {
    id: "habillage-cuisine",
    title: "Habillage de cuisine",
    category: "interieur",
    src: "/images/portfolio/interieur-cuisine-inox.webp",
    alt: "Habillage métallique ajusté dans une cuisine",
    ratio: "4 / 3",
    position: "48% center",
  },
  {
    id: "brasero-sur-mesure",
    title: "Brasero sur mesure",
    category: "creations",
    src: "/images/portfolio/creation-brasero.webp",
    alt: "Brasero circulaire en métal sur son pied",
    ratio: "3 / 4",
  },
  {
    id: "ossature-en-construction",
    title: "L’ossature en construction",
    category: "architecture",
    src: "/images/portfolio/architecture-ossature.webp",
    alt: "Ossature métallique en cours de construction",
    ratio: "4 / 3",
  },
  {
    id: "voilier-manutention",
    title: "Voilier — changement d’échelle",
    category: "creations",
    src: "/images/portfolio/creation-voilier-manutention.webp",
    alt: "Grande création métallique en forme de voilier déplacée devant l’atelier",
    ratio: "9 / 16",
  },
  {
    id: "bibliotheque-metal-bois",
    title: "Bibliothèque métal & bois",
    category: "interieur",
    src: "/images/portfolio/interieur-bibliotheque.webp",
    alt: "Bibliothèque avec structure métallique noire et tablettes en bois",
    ratio: "16 / 9",
    position: "center 45%",
  },
  {
    id: "vador-piece-achevee",
    title: "Dark Vador — pièce achevée",
    category: "creations",
    src: "/images/portfolio/creation-vador-final.webp",
    alt: "Création métallique terminée inspirée du casque de Dark Vador",
    ratio: "1 / 1",
    position: "center 42%",
  },
  {
    id: "escalier-exterieur",
    title: "Escalier extérieur",
    category: "architecture",
    src: "/images/portfolio/architecture-escalier-exterieur.webp",
    alt: "Escalier extérieur et palier en construction métallique",
    ratio: "4 / 3",
  },
  {
    id: "finition-angle",
    title: "Finition d’angle",
    category: "interieur",
    src: "/images/portfolio/interieur-finition-inox.webp",
    alt: "Gros plan sur une finition métallique brossée dans un angle",
    ratio: "4 / 3",
  },
  {
    id: "portail-motifs",
    title: "Portail à motifs",
    category: "architecture",
    src: "/images/portfolio/architecture-portail-organique.webp",
    alt: "Portail métallique ajouré par des motifs organiques",
    ratio: "3 / 4",
  },
  {
    id: "vador-metal-brut",
    title: "Dark Vador — métal brut",
    category: "creations",
    src: "/images/portfolio/creation-vador-brut.webp",
    alt: "Création inspirée de Dark Vador assemblée en métal brut",
    ratio: "9 / 16",
    position: "center 42%",
  },
  {
    id: "cordons-soudure",
    title: "Cordons de soudure",
    category: "atelier",
    src: "/images/portfolio/atelier-soudures.webp",
    alt: "Gros plan sur des cordons de soudure réguliers",
    ratio: "4 / 3",
  },
  {
    id: "structure-caillebotis",
    title: "Structure & caillebotis",
    category: "architecture",
    src: "/images/portfolio/architecture-auvent-caillebotis.webp",
    alt: "Structure métallique équipée de caillebotis",
    ratio: "9 / 16",
  },
  {
    id: "panneaux-ajoures",
    title: "Panneaux ajourés",
    category: "creations",
    src: "/images/portfolio/creation-panneaux-ajoures.webp",
    alt: "Panneaux métalliques découpés et disposés dans l’atelier",
    ratio: "3 / 4",
  },
  {
    id: "renforcement-interieur",
    title: "Renforcement intérieur",
    category: "architecture",
    src: "/images/portfolio/architecture-renforcement-interieur.webp",
    alt: "Poutres métalliques installées dans un bâtiment existant",
    ratio: "4 / 3",
  },
  {
    id: "credence-ajustee",
    title: "Crédence ajustée",
    category: "interieur",
    src: "/images/portfolio/interieur-credence-inox.webp",
    alt: "Crédence métallique ajustée autour d’un évier",
    ratio: "4 / 3",
  },
  {
    id: "motifs-animaliers",
    title: "Motifs animaliers découpés",
    category: "creations",
    src: "/images/portfolio/creation-motifs-animaliers.webp",
    alt: "Silhouettes animalières découpées dans une feuille de métal",
    ratio: "9 / 16",
  },
  {
    id: "annexe-chantier",
    title: "Annexe en chantier",
    category: "architecture",
    src: "/images/portfolio/architecture-annexe-chantier.webp",
    alt: "Annexe équipée de portes coulissantes métalliques en cours de chantier",
    ratio: "3 / 4",
  },
  {
    id: "voilier-metal-brut",
    title: "Voilier — métal brut",
    category: "creations",
    src: "/images/portfolio/creation-voilier-brut.webp",
    alt: "Création en forme de voilier dans son état de métal brut",
    ratio: "9 / 16",
  },
  {
    id: "garde-corps-jardin",
    title: "Garde-corps au jardin",
    category: "architecture",
    src: "/images/portfolio/architecture-garde-corps-jardin.webp",
    alt: "Garde-corps métallique installé le long d’un jardin",
    ratio: "4 / 3",
  },
  {
    id: "vador-appret",
    title: "Dark Vador — apprêt",
    category: "creations",
    src: "/images/portfolio/creation-vador-appret.webp",
    alt: "Création métallique suspendue après application d’un apprêt gris",
    ratio: "9 / 16",
    position: "center 37%",
  },
  {
    id: "portillon-coordonne",
    title: "Portillon coordonné",
    category: "architecture",
    src: "/images/portfolio/architecture-portillon-organique.webp",
    alt: "Portillon métallique ajouré par des motifs organiques",
    ratio: "3 / 4",
  },
  {
    id: "assemblage-chaine",
    title: "Assemblage en chaîne",
    category: "atelier",
    src: "/images/portfolio/atelier-assemblage-chaine.webp",
    alt: "Composition en chaîne et assemblages photographiés dans l’atelier",
    ratio: "9 / 16",
  },
  {
    id: "vador-peinture",
    title: "Dark Vador — mise en peinture",
    category: "creations",
    src: "/images/portfolio/creation-vador-peinture.webp",
    alt: "Mise en peinture noire d’une création métallique dans l’atelier",
    ratio: "9 / 16",
    position: "center 47%",
  },
  {
    id: "limons-escalier",
    title: "Limons préparés en atelier",
    category: "architecture",
    src: "/images/portfolio/architecture-limons-escalier.webp",
    alt: "Limons d’escalier métalliques préparés dans l’atelier",
    ratio: "3 / 4",
  },
  {
    id: "piece-decoupee",
    title: "Pièce découpée & assemblée",
    category: "atelier",
    src: "/images/portfolio/atelier-piece-decoupee.webp",
    alt: "Gros plan sur une pièce métallique découpée et assemblée",
    ratio: "16 / 9",
  },
  {
    id: "colonne-decoupee",
    title: "Colonne découpée",
    category: "creations",
    src: "/images/portfolio/creation-colonne-decoupee.webp",
    alt: "Colonne métallique cylindrique avec silhouette découpée",
    ratio: "9 / 16",
  },
  {
    id: "etude-garde-corps",
    title: "Étude de garde-corps",
    category: "architecture",
    src: "/images/portfolio/architecture-garde-corps-etude.webp",
    alt: "Étude visuelle d’un garde-corps noir à motifs",
    ratio: "3 / 2",
  },
  {
    id: "supports-pierre",
    title: "Supports dans la pierre",
    category: "architecture",
    src: "/images/portfolio/architecture-supports-mur-pierre.webp",
    alt: "Supports métalliques installés dans un mur en pierre",
    ratio: "3 / 4",
  },
];

const filters: { value: "all" | Category; label: string }[] = [
  { value: "all", label: "Tout" },
  { value: "architecture", label: "Architecture & Structure" },
  { value: "interieur", label: "Intérieur & Mobilier" },
  { value: "creations", label: "Créations" },
  { value: "atelier", label: "Atelier & Savoir-faire" },
];

function ProjectTile({ project, index }: { project: Project; index: number }) {
  const label = categoryLabels[project.category];

  return (
    <Dialog>
      <article className="portfolio-card">
        <DialogTrigger asChild>
          <button
            className="portfolio-card-image"
            type="button"
            style={{ aspectRatio: project.ratio }}
            aria-label={`Agrandir : ${project.title}`}
          >
            <Image
              src={withBasePath(project.src)}
              alt={project.alt}
              fill
              priority={index < 2}
              quality={84}
              sizes="(max-width: 680px) 92vw, (max-width: 1080px) 46vw, 31vw"
              style={{ objectPosition: project.position ?? "center" }}
            />
            <span className="portfolio-open" aria-hidden="true">
              Agrandir ↗
            </span>
          </button>
        </DialogTrigger>
        <div className="portfolio-card-caption">
          <span>{label}</span>
          <h2>{project.title}</h2>
        </div>
      </article>

      <DialogContent className="portfolio-dialog" showCloseButton={false}>
        <DialogClose className="portfolio-dialog-close">
          Fermer <span aria-hidden="true">×</span>
        </DialogClose>
        <div className="portfolio-dialog-image">
          <Image
            src={withBasePath(project.src)}
            alt={project.alt}
            fill
            quality={88}
            sizes="(max-width: 760px) 94vw, 82vw"
            style={{ objectPosition: project.position ?? "center" }}
          />
        </div>
        <DialogHeader className="portfolio-dialog-copy">
          <DialogDescription>{label}</DialogDescription>
          <DialogTitle>{project.title}</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export function ProjectGallery() {
  return (
    <Tabs defaultValue="all" className="portfolio-tabs">
      <TabsList className="portfolio-filters" variant="line" aria-label="Filtrer les réalisations">
        {filters.map((filter) => (
          <TabsTrigger className="portfolio-filter" value={filter.value} key={filter.value}>
            {filter.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {filters.map((filter) => {
        const visibleProjects =
          filter.value === "all"
            ? projects
            : projects.filter((project) => project.category === filter.value);

        return (
          <TabsContent className="portfolio-panel" value={filter.value} key={filter.value}>
            <p className="portfolio-count">
              {visibleProjects.length.toString().padStart(2, "0")} photographie
              {visibleProjects.length > 1 ? "s" : ""}
            </p>
            <div className="portfolio-grid">
              {visibleProjects.map((project, index) => (
                <ProjectTile project={project} index={index} key={project.id} />
              ))}
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
