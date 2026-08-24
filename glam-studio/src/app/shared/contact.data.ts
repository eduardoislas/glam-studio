export interface Contact {
  whatsappUrl: string;
  instagramUrl: string;
  instagramHandle: string;
  address: string;
  hours: string;
  mapEmbedUrl: string;
}

export const CONTACT: Contact = {
  whatsappUrl: 'https://wa.link/yyturk',
  instagramUrl: 'https://www.instagram.com/glamstudio.mx_/',
  instagramHandle: '@glamstudio.mx_',
  address: 'Av. Nainari 1730, Urb. No. 6, 85110 Cd. Obregón, Son.',
  hours: 'Lunes a sábado, 9:00am – 7:00pm',
  mapEmbedUrl:
    'https://www.google.com/maps?q=27.4999502,-109.9575301&output=embed',
};
