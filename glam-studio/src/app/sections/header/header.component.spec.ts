import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { CONTACT } from '../../shared/contact.data';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
  });

  it('renders the studio name', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Glam Studio');
  });

  it('renders nav links to each section', () => {
    const el: HTMLElement = fixture.nativeElement;
    const hrefs = Array.from(el.querySelectorAll('.header__nav a')).map(
      (a) => (a as HTMLAnchorElement).getAttribute('href')
    );
    expect(hrefs).toEqual(['#servicios', '#galeria', '#nosotras', '#contacto']);
  });

  it('CTA button links to WhatsApp', () => {
    const el: HTMLElement = fixture.nativeElement;
    const cta = el.querySelector('.header__cta') as HTMLAnchorElement;
    expect(cta.getAttribute('href')).toBe(CONTACT.whatsappUrl);
  });

  it('toggles the mobile nav open state when the toggle button is clicked', () => {
    const el: HTMLElement = fixture.nativeElement;
    const toggle = el.querySelector('.header__toggle') as HTMLButtonElement;
    const nav = el.querySelector('.header__nav') as HTMLElement;

    expect(nav.classList.contains('header__nav--open')).toBe(false);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');

    toggle.click();
    fixture.detectChanges();

    expect(nav.classList.contains('header__nav--open')).toBe(true);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');

    toggle.click();
    fixture.detectChanges();

    expect(nav.classList.contains('header__nav--open')).toBe(false);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });
});
