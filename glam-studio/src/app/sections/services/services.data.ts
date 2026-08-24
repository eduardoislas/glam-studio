export type ServiceIcon = 'brush' | 'rings' | 'comb';

export interface Service {
  name: string;
  description: string;
  icon: ServiceIcon;
}

export const SERVICES: Service[] = [
  {
    name: 'Maquillaje social',
    description: 'Para eventos, fiestas y ocasiones especiales.',
    icon: 'brush',
  },
  {
    name: 'Maquillaje de novia',
    description: 'Look personalizado para el día más importante.',
    icon: 'rings',
  },
  {
    name: 'Peinados y recogidos',
    description: 'Peinados profesionales para cualquier evento.',
    icon: 'comb',
  },
];
