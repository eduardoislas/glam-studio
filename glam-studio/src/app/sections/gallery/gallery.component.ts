import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GALLERY_IMAGES } from './gallery.data';
import { CONTACT } from '../../shared/contact.data';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  readonly images = GALLERY_IMAGES;
  readonly instagramUrl = CONTACT.instagramUrl;
  readonly instagramHandle = CONTACT.instagramHandle;
}
