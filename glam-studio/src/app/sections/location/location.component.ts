import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CONTACT } from '../../shared/contact.data';

@Component({
  selector: 'app-location',
  standalone: true,
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
})
export class LocationComponent {
  readonly address = CONTACT.address;
  readonly hours = CONTACT.hours;
  readonly mapEmbedUrl: SafeResourceUrl;

  constructor(sanitizer: DomSanitizer) {
    this.mapEmbedUrl = sanitizer.bypassSecurityTrustResourceUrl(
      CONTACT.mapEmbedUrl
    );
  }
}
