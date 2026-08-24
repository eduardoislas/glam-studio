import { Component, signal } from '@angular/core';
import { CONTACT } from '../../shared/contact.data';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly whatsappUrl = CONTACT.whatsappUrl;
  readonly isMenuOpen = signal(false);

  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }
}
