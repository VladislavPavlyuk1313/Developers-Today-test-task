import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CountriesComponent } from './components/countries/countries.component';
import { CountryComponent } from './components/country/country.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'countries/:code',
    component: CountryComponent,
  },
  {
    path: 'countries',
    component: CountriesComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
