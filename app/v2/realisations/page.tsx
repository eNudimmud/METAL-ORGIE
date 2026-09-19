import type { Metadata } from 'next';
import { Experience } from '../experience';
export const metadata: Metadata = { title: 'Les réalisations — L’idée prend matière', robots: { index: false, follow: false } };
export default function Page() { return <Experience galleryOnly />; }
