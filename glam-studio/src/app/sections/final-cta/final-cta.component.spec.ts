import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinalCtaComponent } from './final-cta.component';
import { CONTACT } from '../../shared/contact.data';

describe('FinalCtaComponent', () => {
  let fixture: ComponentFixture<FinalCtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalCtaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FinalCtaComponent);
    fixture.detectChanges();
  });

  it('has the #contacto anchor id', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('#contacto')).toBeTruthy();
  });

  it('CTA button links to WhatsApp', () => {
    const el: HTMLElement = fixture.nativeElement;
    const cta = el.querySelector('a.btn-primary') as HTMLAnchorElement;
    expect(cta.getAttribute('href')).toBe(CONTACT.whatsappUrl);
  });
});
