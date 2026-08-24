import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationComponent } from './location.component';
import { CONTACT } from '../../shared/contact.data';

describe('LocationComponent', () => {
  let fixture: ComponentFixture<LocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationComponent);
    fixture.detectChanges();
  });

  it('renders the address and hours', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain(CONTACT.address);
    expect(el.textContent).toContain(CONTACT.hours);
  });

  it('embeds the map iframe pointing at the studio coordinates', () => {
    const el: HTMLElement = fixture.nativeElement;
    const iframe = el.querySelector('iframe') as HTMLIFrameElement;
    expect(iframe.getAttribute('src')).toContain('google.com/maps');
    expect(iframe.getAttribute('src')).toContain('27.4999502');
  });
});
