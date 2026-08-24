import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamComponent } from './team.component';
import { TEAM } from './team.data';

describe('TeamComponent', () => {
  let fixture: ComponentFixture<TeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamComponent);
    fixture.detectChanges();
  });

  it('has the #nosotras anchor id', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('#nosotras')).toBeTruthy();
  });

  it('renders one card per team member', () => {
    const el: HTMLElement = fixture.nativeElement;
    const cards = el.querySelectorAll('.team__card');
    expect(cards.length).toBe(TEAM.length);
  });

  it('renders the first member name, role, and Instagram link', () => {
    const el: HTMLElement = fixture.nativeElement;
    const firstCard = el.querySelector('.team__card') as HTMLElement;
    expect(firstCard.textContent).toContain(TEAM[0].name);
    expect(firstCard.textContent).toContain(TEAM[0].role);
    const link = firstCard.querySelector('a') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe(TEAM[0].instagramUrl);
  });
});
