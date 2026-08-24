import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    fixture.detectChanges();
  });

  it('renders every section in order', () => {
    const el: HTMLElement = fixture.nativeElement;
    const sectionTags = Array.from(el.children).map((child) =>
      child.tagName.toLowerCase()
    );
    expect(sectionTags).toContain('app-header');
    expect(sectionTags).toContain('app-footer');

    const main = el.querySelector('main');
    expect(main).toBeTruthy();
    const mainChildren = Array.from(main!.children).map((child) =>
      child.tagName.toLowerCase()
    );
    expect(mainChildren).toEqual([
      'app-hero',
      'app-about',
      'app-services',
      'app-gallery',
      'app-team',
      'app-location',
      'app-final-cta',
    ]);
  });

  it('resolves every header nav link to a real section id on the page', () => {
    const el: HTMLElement = fixture.nativeElement;
    const navLinks = Array.from(
      el.querySelectorAll('.header__nav a')
    ) as HTMLAnchorElement[];

    expect(navLinks.length).toBeGreaterThan(0);

    for (const link of navLinks) {
      const href = link.getAttribute('href') ?? '';
      expect(href.startsWith('#')).toBe(true);
      const id = href.slice(1);
      const target = el.querySelector('#' + id);
      expect(target, `missing element for ${href}`).toBeTruthy();
    }
  });
});
