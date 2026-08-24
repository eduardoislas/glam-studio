import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalleryComponent } from './gallery.component';
import { GALLERY_IMAGES } from './gallery.data';

describe('GalleryComponent', () => {
  let fixture: ComponentFixture<GalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryComponent);
    fixture.detectChanges();
  });

  it('has the #galeria anchor id', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('#galeria')).toBeTruthy();
  });

  it('renders one image per gallery entry', () => {
    const el: HTMLElement = fixture.nativeElement;
    const images = el.querySelectorAll('.gallery__grid img');
    expect(images.length).toBe(GALLERY_IMAGES.length);
  });

  it('sets the correct src and alt on the first image', () => {
    const el: HTMLElement = fixture.nativeElement;
    const firstImg = el.querySelector('.gallery__grid img') as HTMLImageElement;
    expect(firstImg.getAttribute('src')).toBe(GALLERY_IMAGES[0].src);
    expect(firstImg.getAttribute('alt')).toBe(GALLERY_IMAGES[0].alt);
  });
});
