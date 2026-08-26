export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  frame: string;
  size: 'lg' | 'sm';
}

export const GALLERY_IMAGES: GalleryImage[] = [
  { src: '/gallery/placeholder-1.svg', alt: 'Trabajo de maquillaje y peinado de novia', caption: 'Novia', frame: '21', size: 'lg' },
  { src: '/gallery/placeholder-2.svg', alt: 'Trabajo de maquillaje social', caption: 'Social', frame: '22A', size: 'sm' },
  { src: '/gallery/placeholder-3.svg', alt: 'Trabajo de maquillaje editorial', caption: 'Editorial', frame: '23', size: 'sm' },
  { src: '/gallery/placeholder-4.svg', alt: 'Trabajo de peinado y recogido', caption: 'Peinado', frame: '24', size: 'lg' },
  { src: '/gallery/placeholder-5.svg', alt: 'Detalle de maquillaje', caption: 'Detalle', frame: '24A', size: 'sm' },
  { src: '/gallery/placeholder-6.svg', alt: 'Trabajo de maquillaje de boda', caption: 'Boda', frame: '26', size: 'sm' },
];
