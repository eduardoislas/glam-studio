import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GALLERY_IMAGES } from './gallery.data';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  readonly images = GALLERY_IMAGES;
}
