import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const nextRequire = createRequire(require.resolve('next/package.json'));
const sharp = nextRequire('sharp');
const root = process.cwd();
const catalog = JSON.parse(await fs.readFile(path.join(root, 'app/v2/catalog.json'), 'utf8'));
const out = path.join(root, 'public/images/v2');
await fs.mkdir(out, { recursive: true });
let total = 0;
for (const item of catalog) {
  const src = path.join(root, 'public', item.src);
  for (const width of item.widths) {
    const file = path.join(out, `${item.file}-${width}.avif`);
    const info = await sharp(src).rotate().resize({ width, withoutEnlargement: true }).avif({ quality: 53, effort: 4 }).toFile(file);
    total += info.size;
  }
  const info = await sharp(src).rotate().resize({ width: Math.min(960, item.width), withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(out, `${item.file}.webp`));
  total += info.size;
}
await sharp(path.join(root, 'public/images/logo-metalorgie.jpg')).resize(160, 160).webp({ quality: 84 }).toFile(path.join(out, 'embleme.webp'));
console.log(`V2 : ${catalog.length} photographies AVIF/WebP, ${(total / 1024 / 1024).toFixed(2)} Mo pour toutes les variantes.`);
