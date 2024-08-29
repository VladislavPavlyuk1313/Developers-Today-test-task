import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { RandomCountriesComponent } from '../random-countries/random-countries.component';
import { RouterLink } from '@angular/router';
import { COUNTRIES_PATH } from '../../app.routes';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent, RandomCountriesComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected readonly COUNTRIES_PATH = COUNTRIES_PATH;
}
