import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
  });

  it('renders the "Sobre el estudio" heading', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('h2')?.textContent).toContain(
      'Sobre el estudio'
    );
  });

  it('renders a non-empty description paragraph', () => {
    const el: HTMLElement = fixture.nativeElement;
    const paragraph = el.querySelector('p');
    expect(paragraph?.textContent?.trim().length).toBeGreaterThan(20);
  });
});
