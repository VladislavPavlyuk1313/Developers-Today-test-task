import { Component, OnInit } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { AppStateModel } from '../../state/app.model';
import { Store } from '@ngxs/store';
import { AppState } from '../../state/app.state';
import { Country } from '../../symbols';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss',
})
export class CountriesComponent implements OnInit {
  protected countries$: Observable<AppStateModel['countries']>;
  protected groupedCountries$: Observable<{ [letter: string]: Country[] }>;
  protected letters$: Observable<string[]>;

  constructor(private store: Store) {
    this.countries$ = this.store.select(AppState.countries);
  }

  ngOnInit() {
    this.groupedCountries$ = this.countries$.pipe(
      filter((countries) => countries.length > 0),
      map((countries) => {
        const res: { [letter: string]: Country[] } = {};
        for (const country of countries) {
          const letter = country.name[0];
          if (res[letter]) {
            res[letter].push(country);
          } else {
            res[letter] = [country];
          }
        }

        return res;
      }),
    );

    this.letters$ = this.groupedCountries$.pipe(
      map((groupedCountries) => Object.keys(groupedCountries)),
    );
  }
}
