import { Component } from '@angular/core';
import { CONTACT } from '../../shared/contact.data';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  readonly whatsappUrl = CONTACT.whatsappUrl;
}
