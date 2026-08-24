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
});
