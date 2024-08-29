import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  Observable,
  startWith,
  take,
} from 'rxjs';
import { AppStateModel } from '../../state/app.model';
import { Store } from '@ngxs/store';
import { AppState } from '../../state/app.state';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormControl } from '@angular/forms';
import { CountryCode, CountryInfo, PublicHoliday } from '../../symbols';
import { FetchCountryInfo, FetchPublicHolidays } from '../../state/app.actions';
import { AsyncPipe, JsonPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [RouterModule, AsyncPipe, JsonPipe, NgClass],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
})
export class CountryComponent implements OnInit {
  protected yearOptions = [
    2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
  ];
  protected yearControl = new FormControl(new Date().getFullYear());
  protected countries$: Observable<AppStateModel['countries']>;

  private selectedCountryCodeSubject = new BehaviorSubject<CountryCode>(null);
  protected selectedCountryCode$ = this.selectedCountryCodeSubject
    .asObservable()
    .pipe(filter((code) => !!code));

  protected selectedCountryInfo$: Observable<CountryInfo>;
  protected selectedHolidays$: Observable<PublicHoliday[]>;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.countries$ = this.store.select(AppState.countries);
  }

  ngOnInit() {
    combineLatest([
      this.route.params,
      this.countries$.pipe(filter((countries) => countries.length > 0)),
    ])
      .pipe(take(1))
      .subscribe(([params, countries]) => {
        const isCountryCodeCorrect = countries.some(
          (country) => country.countryCode === params['code'],
        );
        if (isCountryCodeCorrect) {
          this.selectedCountryCodeSubject.next(params['code']);
          this.store.dispatch(
            new FetchPublicHolidays(this.yearControl.value, params['code']),
          );
        } else {
          this.router.navigate(['/not-found']);
        }
      });

    this.selectedCountryInfo$ = combineLatest([
      this.store.select(AppState.countriesInfoDict),
      this.selectedCountryCode$,
    ]).pipe(
      map(
        ([countriesInfoDict, selectedCountryCode]) =>
          countriesInfoDict?.[selectedCountryCode],
      ),
    );

    this.selectedHolidays$ = combineLatest([
      this.store.select(AppState.holidaysDict),
      this.selectedCountryCode$,
      this.yearControl.valueChanges.pipe(startWith(this.yearControl.value)),
    ]).pipe(
      map(
        ([holidaysDict, selectedCountryCode, selectedYear]) =>
          holidaysDict?.[selectedCountryCode]?.[selectedYear],
      ),
    );

    this.selectedCountryCode$.subscribe((countryCode) => {
      this.store.dispatch(new FetchCountryInfo(countryCode));
    });

    combineLatest([
      this.selectedCountryCode$,
      this.yearControl.valueChanges.pipe(startWith(this.yearControl.value)),
    ]).subscribe(([selectedCountryCode, selectedYear]) => {
      this.store.dispatch(
        new FetchPublicHolidays(selectedYear, selectedCountryCode),
      );
    });
  }
}
