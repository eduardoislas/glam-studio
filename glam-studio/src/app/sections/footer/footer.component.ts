import { Component } from '@angular/core';
import { CONTACT } from '../../shared/contact.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly whatsappUrl = CONTACT.whatsappUrl;
  readonly instagramUrl = CONTACT.instagramUrl;
  readonly instagramHandle = CONTACT.instagramHandle;
  readonly year = new Date().getFullYear();
}
