import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CountriesComponent } from './components/countries/countries.component';
import { CountryComponent } from './components/country/country.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const HOME_PATH = '';
export const COUNTRIES_PATH = 'countries';
export const NOT_FOUND_PATH = 'not-found';
export const COUNTRY_CODE_PARAM_NAME = 'countryCode';

export const routes: Routes = [
  {
    path: HOME_PATH,
    component: HomeComponent,
  },
  {
    path: `${COUNTRIES_PATH}/:${COUNTRY_CODE_PARAM_NAME}`,
    component: CountryComponent,
  },
  {
    path: COUNTRIES_PATH,
    component: CountriesComponent,
  },
  {
    path: NOT_FOUND_PATH,
    component: NotFoundComponent,
  },
];
