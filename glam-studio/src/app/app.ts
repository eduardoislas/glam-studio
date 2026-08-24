import { Component } from '@angular/core';
import { HeaderComponent } from './sections/header/header.component';
import { HeroComponent } from './sections/hero/hero.component';
import { AboutComponent } from './sections/about/about.component';
import { ServicesComponent } from './sections/services/services.component';
import { GalleryComponent } from './sections/gallery/gallery.component';
import { TeamComponent } from './sections/team/team.component';
import { LocationComponent } from './sections/location/location.component';
import { FinalCtaComponent } from './sections/final-cta/final-cta.component';
import { FooterComponent } from './sections/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    GalleryComponent,
    TeamComponent,
    LocationComponent,
    FinalCtaComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
