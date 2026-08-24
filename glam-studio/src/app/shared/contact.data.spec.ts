import { CONTACT } from './contact.data';

describe('CONTACT', () => {
  it('has a WhatsApp booking link', () => {
    expect(CONTACT.whatsappUrl).toBe('https://wa.link/yyturk');
  });

  it('has the real studio address', () => {
    expect(CONTACT.address).toBe(
      'Av. Nainari 1730, Urb. No. 6, 85110 Cd. Obregón, Son.'
    );
  });

  it('has a Google Maps embed URL pointing at the studio coordinates', () => {
    expect(CONTACT.mapEmbedUrl).toContain('27.4999502');
    expect(CONTACT.mapEmbedUrl).toContain('-109.9575301');
    expect(CONTACT.mapEmbedUrl).toContain('output=embed');
  });
});
