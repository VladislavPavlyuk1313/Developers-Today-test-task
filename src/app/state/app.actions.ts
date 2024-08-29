import { Country, CountryCode, CountryInfo, PublicHoliday } from '../symbols';

export class FetchAllCountries {
  static readonly type = '[App] FetchAllCountries';
  constructor() {}
}

export class FetchAllCountriesSuccess {
  static readonly type = '[App] FetchAllCountriesSuccess';
  constructor(public countries: Country[]) {}
}

export class FetchAllCountriesFail {
  static readonly type = '[App] FetchAllCountriesFail';
  constructor(public error: any) {}
}

export class FetchCountryInfo {
  static readonly type = '[App] FetchCountryInfo';
  constructor(public countryCode: CountryCode) {}
}

export class FetchCountryInfoSuccess {
  static readonly type = '[App] FetchCountryInfoSuccess';
  constructor(public countryInfo: CountryInfo) {}
}

export class FetchCountryInfoFail {
  static readonly type = '[App] FetchCountryInfoFail';
  constructor(public error: any) {}
}

export class FetchPublicHolidays {
  static readonly type = '[App] FetchPublicHolidays';
  constructor(
    public year: number,
    public countryCode: CountryCode,
  ) {}
}

export class FetchPublicHolidaysSuccess {
  static readonly type = '[App] FetchPublicHolidaysSuccess';
  constructor(
    public year: number,
    public countryCode: CountryCode,
    public holidays: PublicHoliday[],
  ) {}
}

export class FetchPublicHolidaysFail {
  static readonly type = '[App] FetchPublicHolidaysFail';
  constructor(public error: any) {}
}

export class FetchNextPublicHolidays {
  static readonly type = '[App] FetchNextPublicHolidays';
  constructor(public countryCode: CountryCode) {}
}

export class FetchNextPublicHolidaysSuccess {
  static readonly type = '[App] FetchNextPublicHolidaysSuccess';
  constructor(
    public countryCode: CountryCode,
    public holidays: PublicHoliday[],
  ) {}
}

export class FetchNextPublicHolidaysFail {
  static readonly type = '[App] FetchNextPublicHolidaysFail';
  constructor(public error: any) {}
}
