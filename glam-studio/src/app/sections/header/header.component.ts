import { Component } from '@angular/core';
import { CONTACT } from '../../shared/contact.data';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly whatsappUrl = CONTACT.whatsappUrl;
}
