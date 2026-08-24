import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { CONTACT } from '../../shared/contact.data';

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
  });

  it('links to Instagram and WhatsApp', () => {
    const el: HTMLElement = fixture.nativeElement;
    const links = Array.from(el.querySelectorAll('a')).map((a) =>
      a.getAttribute('href')
    );
    expect(links).toContain(CONTACT.instagramUrl);
    expect(links).toContain(CONTACT.whatsappUrl);
  });

  it('renders the current year in the copyright line', () => {
    const el: HTMLElement = fixture.nativeElement;
    const currentYear = new Date().getFullYear().toString();
    expect(el.textContent).toContain(currentYear);
  });
});
