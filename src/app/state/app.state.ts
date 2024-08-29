import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { APP_STATE_DEFAULT, AppStateModel } from './app.model';
import { CountriesService } from '../services/contries.service';
import { HolidayService } from '../services/holiday.service';
import {
  FetchAllCountries,
  FetchAllCountriesFail,
  FetchAllCountriesSuccess,
  FetchCountryInfo,
  FetchCountryInfoSuccess,
  FetchCountryInfoFail,
  FetchPublicHolidays,
  FetchPublicHolidaysSuccess,
  FetchPublicHolidaysFail,
  FetchNextPublicHolidays,
  FetchNextPublicHolidaysSuccess,
  FetchNextPublicHolidaysFail,
} from './app.actions';

@Injectable()
@State({
  name: 'app',
  defaults: APP_STATE_DEFAULT,
})
export class AppState implements NgxsOnInit {
  @Selector()
  static countries(state: AppStateModel) {
    return state.countries;
  }

  @Selector()
  static countriesInfoDict(state: AppStateModel) {
    return state.countriesInfoDict;
  }

  @Selector()
  static holidaysDict(state: AppStateModel) {
    return state.holidaysDict;
  }

  @Selector()
  static nextHolidaysDict(state: AppStateModel) {
    return state.nextHolidaysDict;
  }

  constructor(
    private countriesService: CountriesService,
    private holidayService: HolidayService,
  ) {}

  ngxsOnInit({ dispatch }: StateContext<AppStateModel>): void {
    dispatch(new FetchAllCountries());
  }

  @Action(FetchAllCountries)
  fetchAllCountries({ dispatch }: StateContext<AppStateModel>): void {
    this.countriesService.getAllCountries().subscribe({
      next: (countries) => dispatch(new FetchAllCountriesSuccess(countries)),
      error: (err) => dispatch(new FetchAllCountriesFail(err)),
    });
  }

  @Action(FetchAllCountriesSuccess)
  fetchAllCountriesSuccess(
    { patchState }: StateContext<AppStateModel>,
    { countries }: FetchAllCountriesSuccess,
  ): void {
    patchState({
      countries: countries,
    });
  }

  @Action(FetchAllCountriesFail)
  FetchAllCountriesFail(
    _: StateContext<AppStateModel>,
    { error }: FetchAllCountriesFail,
  ): void {
    console.error(
      `Something went wrong while countries is fetching. Error: ${JSON.stringify(error)}`,
    );
  }

  @Action(FetchCountryInfo)
  fetchCountryInfo(
    { dispatch }: StateContext<AppStateModel>,
    { countryCode }: FetchCountryInfo,
  ): void {
    this.countriesService.getCountryInfo(countryCode).subscribe({
      next: (countryInfo) => dispatch(new FetchCountryInfoSuccess(countryInfo)),
      error: (err) => dispatch(new FetchCountryInfoFail(err)),
    });
  }

  @Action(FetchCountryInfoSuccess)
  fetchCountryInfoSuccess(
    { getState, patchState }: StateContext<AppStateModel>,
    { countryInfo }: FetchCountryInfoSuccess,
  ): void {
    const countriesInfoDict = { ...getState().countriesInfoDict };
    countriesInfoDict[countryInfo.countryCode] = countryInfo;

    patchState({
      countriesInfoDict: countriesInfoDict,
    });
  }

  @Action(FetchCountryInfoFail)
  FetchCountryInfoFail(
    _: StateContext<AppStateModel>,
    { error }: FetchCountryInfoFail,
  ): void {
    console.error(
      `Something went wrong while country info is fetching. Error: ${JSON.stringify(error)}`,
    );
  }

  @Action(FetchPublicHolidays)
  fetchPublicHolidays(
    { dispatch }: StateContext<AppStateModel>,
    { year, countryCode }: FetchPublicHolidays,
  ): void {
    this.holidayService.getPublicHolidays(year, countryCode).subscribe({
      next: (holidays) =>
        dispatch(new FetchPublicHolidaysSuccess(year, countryCode, holidays)),
      error: (err) => dispatch(new FetchPublicHolidaysFail(err)),
    });
  }

  @Action(FetchPublicHolidaysSuccess)
  fetchPublicHolidaysSuccess(
    { getState, patchState }: StateContext<AppStateModel>,
    { year, countryCode, holidays }: FetchPublicHolidaysSuccess,
  ): void {
    const holidaysDict = { ...getState().holidaysDict };
    const countryHolidaysDict = { ...holidaysDict[countryCode] };
    countryHolidaysDict[year] = holidays;

    patchState({
      holidaysDict: {
        ...holidaysDict,
        [countryCode]: countryHolidaysDict,
      },
    });
  }

  @Action(FetchPublicHolidaysFail)
  FetchPublicHolidaysFail(
    _: StateContext<AppStateModel>,
    { error }: FetchPublicHolidaysFail,
  ): void {
    console.error(
      `Something went wrong while holidays info is fetching. Error: ${JSON.stringify(error)}`,
    );
  }

  @Action(FetchNextPublicHolidays)
  fetchNextPublicHolidays(
    { dispatch }: StateContext<AppStateModel>,
    { countryCode }: FetchNextPublicHolidays,
  ): void {
    this.holidayService.getNextPublicHolidays(countryCode).subscribe({
      next: (holidays) =>
        dispatch(new FetchNextPublicHolidaysSuccess(countryCode, holidays)),
      error: (err) => dispatch(new FetchNextPublicHolidaysFail(err)),
    });
  }

  @Action(FetchNextPublicHolidaysSuccess)
  fetchNextPublicHolidaysSuccess(
    { getState, patchState }: StateContext<AppStateModel>,
    { countryCode, holidays }: FetchNextPublicHolidaysSuccess,
  ): void {
    const nextHolidaysDict = { ...getState().nextHolidaysDict };
    nextHolidaysDict[countryCode] = holidays;

    patchState({
      nextHolidaysDict: nextHolidaysDict,
    });
  }

  @Action(FetchNextPublicHolidaysFail)
  FetchNextPublicHolidaysFail(
    _: StateContext<AppStateModel>,
    { error }: FetchNextPublicHolidaysFail,
  ): void {
    console.error(
      `Something went wrong while next holidays info is fetching. Error: ${JSON.stringify(error)}`,
    );
  }
}
