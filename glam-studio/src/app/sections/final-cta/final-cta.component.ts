import { Component } from '@angular/core';
import { CONTACT } from '../../shared/contact.data';

@Component({
  selector: 'app-final-cta',
  standalone: true,
  templateUrl: './final-cta.component.html',
  styleUrl: './final-cta.component.scss',
})
export class FinalCtaComponent {
  readonly whatsappUrl = CONTACT.whatsappUrl;
  readonly instagramHandle = CONTACT.instagramHandle;
}
