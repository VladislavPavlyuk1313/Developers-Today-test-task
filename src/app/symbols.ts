export type CountryCode = string;

export interface Country {
  countryCode: CountryCode;
  name: string;
}

export interface CountryInfo {
  commonName: string;
  officialName: string;
  countryCode: CountryCode;
  region: string;
  borders: CountryInfo[];
}

export enum PublicHolidayTypes {
  PUBLIC = "Public",
  //...
}

export interface PublicHoliday {
  date: string,
  localName: string,
  name: string,
  countryCode: CountryCode,
  global: true,
  counties: CountryCode[],
  launchYear: number,
  types: PublicHolidayTypes[]
}
