import { withBasePath } from '@/lib/base-path';
import { getPhoto } from './data';
import type { CSSProperties } from 'react';
export function Picture({ id, className, sizes = '(max-width: 700px) 100vw, 65vw', priority = false, style }: {
  id: string; className?: string; sizes?: string; priority?: boolean; style?: CSSProperties;
}) {
  const photo = getPhoto(id);
  const imageBase = withBasePath('/images/v2/' + photo.file);
  return <picture className={className}>
    <source type="image/avif" srcSet={photo.widths.map(w => `${imageBase}-${w}.avif ${w}w`).join(', ')} sizes={sizes} />
    <img src={imageBase + '.webp'} alt={photo.alt} width={photo.width} height={photo.height}
      loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async"
      style={{ objectPosition: photo.position ?? 'center', ...style }} />
  </picture>;
}
