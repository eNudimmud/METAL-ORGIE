import catalog from './catalog.json';
export type Category = 'architecture' | 'interieur' | 'creations' | 'atelier';
export type Photo = (typeof catalog)[number];
export const photos = catalog;
export const categories: { id: Category | 'all'; label: string; short: string }[] = [
  { id: 'all', label: 'Toutes les réalisations', short: 'Tout' },
  { id: 'architecture', label: 'Architecture & Structure', short: 'Architecture' },
  { id: 'interieur', label: 'Intérieur & Mobilier', short: 'Intérieur' },
  { id: 'creations', label: 'Créations', short: 'Créations' },
  { id: 'atelier', label: 'Atelier & Savoir-faire', short: 'Atelier' },
];
export function getPhoto(id: string): Photo { return photos.find(p => p.id === id) ?? photos[0]; }
export function categoryLabel(id: string) { return categories.find(c => c.id === id)?.label ?? id; }
export const series = {
  vader: ['vador-metal-brut', 'vador-appret', 'vador-peinture', 'vador-piece-achevee'],
  sailboat: ['voilier-metal-brut', 'voilier-manutention'],
  gates: ['portail-motifs', 'portillon-coordonne'],
};
export const projectNotes: Record<string, string> = {
  'terrasse-surelevee': 'Une nouvelle manière d’habiter l’extérieur. Le garde-corps dessine la limite, la structure ouvre l’espace.',
  'brasero-sur-mesure': 'Une forme circulaire, une présence sculpturale. Un brasero pensé comme une pièce à part entière dans l’espace extérieur.',
  'bibliotheque-metal-bois': 'La finesse d’une structure noire rencontre la chaleur du bois. Le dessin de la bibliothèque reste lisible jusque dans ses diagonales.',
  'habillage-cuisine': 'Des plans métalliques qui dialoguent avec la couleur. Une autre façon de donner du caractère à la cuisine.',
  'vador-piece-achevee': 'D’une silhouette familière à une pièce métallique singulière. Les images de fabrication racontent le passage du métal brut à la finition noire.',
  'cordons-soudure': 'Les cordons et les points de rencontre disent autant de l’ouvrage que sa silhouette. Le travail se lit de près.',
  'finition-angle': 'Deux lignes deviennent un angle. Une rencontre précise entre les pièces, visible dans le brossage et la continuité de la finition.',
  'etude-garde-corps': 'Étude visuelle d’un garde-corps à motifs. Cette image présente une intention de dessin ; elle ne documente pas une réalisation installée.',
};
export function noteFor(photo: Photo) {
  if (series.vader.includes(photo.id)) return projectNotes['vador-piece-achevee'];
  if (series.sailboat.includes(photo.id)) return 'Du métal brut à la manutention : deux vues d’une création en forme de voilier qui joue avec l’échelle.';
  return projectNotes[photo.id] ?? 'Une vue du travail de Métal’Orgie. Le dessin, les proportions et les assemblages répondent à un contexte particulier. Et si votre idée était la prochaine ?';
}
export function seriesFor(id: string): Photo[] {
  const group = Object.values(series).find(ids => ids.includes(id));
  return (group ?? [id]).map(getPhoto);
}
