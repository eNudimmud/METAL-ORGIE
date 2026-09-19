# Métal'Orgie

Site vitrine de Métal'Orgie, l'atelier de construction métallique et de créations sur mesure de Guillaume Rossier en Suisse.

**Version de présentation :** https://enudimmud.github.io/METAL-ORGIE/

## Développement local

Prérequis : Node.js 22 et pnpm.

```bash
pnpm install
pnpm dev
```

Le site est construit avec Next.js et exporté en fichiers statiques pour GitHub Pages.

```bash
pnpm build
```

Le résultat est généré dans `out/`.

## Déploiement

Chaque push sur `main` déclenche le workflow GitHub Pages. Le chemin public `/METAL-ORGIE` est injecté pendant la construction afin que les pages, photographies et polices fonctionnent sous l'URL du dépôt.

## État de cette V1

- homepage responsive et galerie filtrable ;
- 29 photographies de réalisations intégrées ;
- quatre familles éditoriales ;
- étude de cas Dark Vador et preuves de savoir-faire ;
- formulaire de contact visuel uniquement : l'envoi sera raccordé après validation des coordonnées définitives.

Les coordonnées commerciales, mentions légales et informations pratiques doivent être confirmées avant une mise en production définitive.

## V2 — L’idée prend matière

Nouvelle proposition : https://enudimmud.github.io/METAL-ORGIE/v2/

La V2 dispose d’une narration éditoriale, d’une galerie de 29 vues filtrables, de séries de fabrication, de favoris locaux et d’un carnet qui prépare un brief téléchargeable ou partageable. Aucun envoi de demande à l’atelier n’est simulé.

Les images responsive sont générées automatiquement en AVIF et WebP à partir du corpus versionné, avant `next build`. Les originaux restent intacts. L’audit et les décisions sont dans `docs/V2_DIRECTION.md`.

La V1 demeure à l’URL initiale pour comparaison. Les pages V2 sont marquées `noindex` pendant la validation. `v2-review.html` est un outil de contrôle des largeurs 320, 390 et 768 pixels.
