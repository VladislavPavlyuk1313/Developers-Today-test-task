import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter, map, Observable, withLatestFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Country } from '../../symbols';
import { AppStateModel } from '../../state/app.model';
import { Store } from '@ngxs/store';
import { AppState } from '../../state/app.state';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { COUNTRIES_PATH } from '../../app.routes';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIcon,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit {
  searchControl = new FormControl('');
  options$: Observable<Country[]>;
  protected countries$: Observable<AppStateModel['countries']>;

  constructor(private store: Store) {
    this.countries$ = this.store.select(AppState.countries);
  }

  ngOnInit() {
    this.options$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      filter((value): value is string => value !== null && value.length > 1),
      withLatestFrom(this.countries$),
      map<[string, Country[]], Country[]>(([value, countries]) => {
        return this._filterOptions(value, countries);
      }),
    );
  }

  private _filterOptions(searchValue: string, countries: Country[]): Country[] {
    const startsWithValueRegex = new RegExp(`^${searchValue}`, 'i');
    const containsValueRegex = new RegExp(`(?<!^)${searchValue}`, 'i');

    return [
      ...countries.filter((country) => startsWithValueRegex.test(country.name)),
      ...countries.filter((country) => containsValueRegex.test(country.name)),
    ];
  }

  protected readonly COUNTRIES_PATH = COUNTRIES_PATH;
}
