import { Component, OnInit } from '@angular/core';
import { filter, Observable, Subscription, take } from 'rxjs';
import { AppStateModel } from '../../state/app.model';
import { Store } from '@ngxs/store';
import { AppState } from '../../state/app.state';
import { Country } from '../../symbols';
import {
  FetchCountryInfo,
  FetchNextPublicHolidays,
} from '../../state/app.actions';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { COUNTRIES_PATH } from '../../app.routes';

@Component({
  selector: 'app-random-countries',
  standalone: true,
  imports: [RouterLink, AsyncPipe, JsonPipe, MatIcon],
  templateUrl: './random-countries.component.html',
  styleUrl: './random-countries.component.scss',
})
export class RandomCountriesComponent implements OnInit {
  protected countries$: Observable<AppStateModel['countries']>;
  protected countriesInfoDict$: Observable<AppStateModel['countriesInfoDict']>;
  protected nextHolidaysDict$: Observable<AppStateModel['nextHolidaysDict']>;
  public selectedCountries: Country[] = [];

  private subscriptions = new Subscription();

  constructor(private store: Store) {
    this.countries$ = this.store.select(AppState.countries);
    this.countriesInfoDict$ = this.store.select(AppState.countriesInfoDict);
    this.nextHolidaysDict$ = this.store.select(AppState.nextHolidaysDict);
  }

  ngOnInit() {
    this.subscriptions.add(
      this.countries$
        .pipe(
          filter((countries) => countries.length > 0),
          take(1),
        )
        .subscribe((countries) => this.selectRandomCountries(countries)),
    );
  }

  selectRandomCountries(countries: Country[]) {
    this.selectedCountries = this.getRandomElements(countries, 3);
    this.selectedCountries.forEach((country) => {
      this.store.dispatch([
        new FetchCountryInfo(country.countryCode),
        new FetchNextPublicHolidays(country.countryCode),
      ]);
    });
  }

  private getRandomElements(array: Array<any>, n: number) {
    const shuffled = array.slice().sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
  }

  protected readonly COUNTRIES_PATH = COUNTRIES_PATH;
}
