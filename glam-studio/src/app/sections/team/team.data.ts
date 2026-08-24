export interface TeamMember {
  name: string;
  role: string;
  instagramUrl: string;
  photo: string;
}

export const TEAM: TeamMember[] = [
  {
    name: 'Sofía',
    role: 'Maquillaje',
    instagramUrl: 'https://www.instagram.com/sofiaislasmakeup/',
    photo: '/team/sofia.svg',
  },
  {
    name: 'Perla Huerta',
    role: 'Peinado',
    instagramUrl: 'https://www.instagram.com/perlahuerta.hair/',
    photo: '/team/perla.svg',
  },
];
