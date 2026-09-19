import type { Metadata } from 'next';
import { Experience } from './experience';
export const metadata: Metadata = {
  title: 'L’idée prend matière',
  description: 'Acier. Inox. Aluminium. Entrez dans l’univers de Métal’Orgie : construction métallique, mobilier et créations sur mesure de Guillaume Rossier en Suisse.',
  robots: { index: false, follow: false },
  openGraph: { title: 'Métal’Orgie — L’idée prend matière.', description: 'Toutes les formes du métal. Découvrez l’atelier de Guillaume Rossier.', images: [{ url: 'https://enudimmud.github.io/METAL-ORGIE/images/portfolio/architecture-terrasse.webp', width: 1536, height: 864 }] },
};
export default function Page() { return <Experience />; }
