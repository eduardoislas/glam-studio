import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { CONTACT } from '../../shared/contact.data';

describe('HeroComponent', () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    fixture.detectChanges();
  });

  it('has the #top anchor id', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('#top')).toBeTruthy();
  });

  it('renders the headline', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Maquillaje');
    expect(el.textContent).toContain('Cd. Obregón');
  });

  it('CTA button links to WhatsApp', () => {
    const el: HTMLElement = fixture.nativeElement;
    const cta = el.querySelector('.hero a.btn-primary') as HTMLAnchorElement;
    expect(cta.getAttribute('href')).toBe(CONTACT.whatsappUrl);
  });
});
