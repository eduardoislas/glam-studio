import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TEAM } from './team.data';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent {
  readonly team = TEAM;
}
