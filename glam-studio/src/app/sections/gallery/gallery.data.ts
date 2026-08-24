export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  size: 'lg' | 'sm';
}

export const GALLERY_IMAGES: GalleryImage[] = [
  { src: '/gallery/placeholder-1.svg', alt: 'Trabajo de maquillaje y peinado de novia', caption: 'Novia', size: 'lg' },
  { src: '/gallery/placeholder-2.svg', alt: 'Trabajo de maquillaje social', caption: 'Social', size: 'sm' },
  { src: '/gallery/placeholder-3.svg', alt: 'Trabajo de maquillaje editorial', caption: 'Editorial', size: 'sm' },
  { src: '/gallery/placeholder-4.svg', alt: 'Trabajo de peinado y recogido', caption: 'Peinado', size: 'lg' },
  { src: '/gallery/placeholder-5.svg', alt: 'Detalle de maquillaje', caption: 'Detalle', size: 'sm' },
  { src: '/gallery/placeholder-6.svg', alt: 'Trabajo de maquillaje de boda', caption: 'Boda', size: 'sm' },
];
