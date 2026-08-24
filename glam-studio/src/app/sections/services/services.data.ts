export interface Service {
  name: string;
  description: string;
}

export const SERVICES: Service[] = [
  {
    name: 'Maquillaje social',
    description: 'Para eventos, fiestas y ocasiones especiales.',
  },
  {
    name: 'Maquillaje de novia',
    description: 'Look personalizado para el día más importante.',
  },
  {
    name: 'Peinados y recogidos',
    description: 'Peinados profesionales para cualquier evento.',
  },
];
