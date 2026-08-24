import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicesComponent } from './services.component';
import { SERVICES } from './services.data';

describe('ServicesComponent', () => {
  let fixture: ComponentFixture<ServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesComponent);
    fixture.detectChanges();
  });

  it('has the #servicios anchor id', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('#servicios')).toBeTruthy();
  });

  it('renders one card per service', () => {
    const el: HTMLElement = fixture.nativeElement;
    const cards = el.querySelectorAll('.services__card');
    expect(cards.length).toBe(SERVICES.length);
  });

  it('renders the first service name and description', () => {
    const el: HTMLElement = fixture.nativeElement;
    const firstCard = el.querySelector('.services__card');
    expect(firstCard?.textContent).toContain(SERVICES[0].name);
    expect(firstCard?.textContent).toContain(SERVICES[0].description);
  });
});
