import {Country, CountryCode, CountryInfo, PublicHoliday} from "../symbols";

export interface AppStateModel {
  countries: Country[];
  countriesInfoDict: {[countryCode: CountryCode]: CountryInfo}
  holidaysDict: {
    [countryCode: CountryCode]: {
      [year: number]: PublicHoliday[]
    }
  }
  nextHolidaysDict: {[countryCode: CountryCode]: PublicHoliday[]}
}

export const APP_STATE_DEFAULT: AppStateModel = {
  countries: [],
  countriesInfoDict: {},
  holidaysDict: {},
  nextHolidaysDict: {}
}
