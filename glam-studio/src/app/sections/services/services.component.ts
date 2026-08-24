import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SERVICES } from './services.data';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  readonly services = SERVICES;
}
